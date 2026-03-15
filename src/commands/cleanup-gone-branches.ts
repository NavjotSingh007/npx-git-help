import { TerminalCommand } from "../services/TerminalCommand"; 
const terminalCommand = TerminalCommand();


export default async function main() {
  console.log("Fetching and pruning remotes...");
  terminalCommand.runCommand("git fetch -p");

  console.log("Looking for local branches tracking deleted remote branches...");

  const branchOutput = terminalCommand.runCommand("git branch -vv");

  const branches = branchOutput
    .split("\n")
    .filter((line) => line.includes(": gone]"))
    .map((line) => line.trim().split(/\s+/)[0]);

  if (branches.length === 0) {
    console.log("No local branches tracking deleted remotes found.");
    process.exit(0);
  }

  console.log("The following local branches track deleted remotes:");
  console.log(branches.join("\n"));
  console.log("");

  const confirm = await terminalCommand.askQuestion("Do you want to delete them all? (y/n): ");

  if (confirm.toLowerCase() === "y") {
    branches.forEach((branch) => {
      console.log(`Deleting ${branch}...`);
      terminalCommand.runCommand(`git branch -D ${branch}`);
    });
    console.log("Deleted.");
  } else {
    console.log("Aborted.");
  }
};
