#!/usr/bin/env node

import * as packageJson from "../package.json";
import { program } from "commander";
import handlecleanUpGoneBranches from "./commands/cleanup-gone-branches";

program
  .version(packageJson.version)
  .description("A simple CLI tool to help with git operations");

program
  .command("clean-up-gone-branches")
  .alias("cb")
  .description(
    "Deletes all local branches that have been removed from the remote repository",
  )
  .action(() => {
    handlecleanUpGoneBranches();
  });

program.parse();
