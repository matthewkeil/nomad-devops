import DEBUG from "debug";
const debug = DEBUG("devops:lib:debug");
import { resolve, sep } from "path";

export { DEBUG };
export const Debug = (dirName = "", fileName = "") => {
  const ROOT = resolve(__dirname, "..");
  const path = ["devops"]
    .concat(
      dirName
        .replace(ROOT, "")
        .split(sep)
        .filter(segment => segment !== "")
        .concat(
          fileName
            .split("/")
            .pop()
            ?.split(".")
            .shift() || ""
        )
    )
    .join(":");
  return DEBUG(path);
};
