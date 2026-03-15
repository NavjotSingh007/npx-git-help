#!/usr/bin/env ts-node
import { execSync } from "child_process";
import * as readline from "readline";

export function TerminalCommand() {
  function runCommand(command: string): string {
    try {
      return execSync(command, { encoding: "utf-8" }).trim();
    } catch {
      return "";
    }
  }

  function askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }
  return {
    runCommand,
    askQuestion,
  }
}
