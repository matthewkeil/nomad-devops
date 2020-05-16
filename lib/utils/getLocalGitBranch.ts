import { execSync } from "child_process";

export const getLocalGitBranch = () => {
  const output = execSync("git status");
  const results = /^On\sbranch\s([\S]*).*/.exec(output.toString());
  if (!results) {
    throw new Error("git not installed or cannot determine what branch you are on");
  }
  return results[1];
};
