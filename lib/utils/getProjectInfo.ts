import { config } from "../../config";

interface FrameworkInfo {
  distLocation: string[];
  commands: string[];
}
const frameworkDetails = new Map<string, FrameworkInfo>([
  [
    "angular",
    {
      distLocation: [""],
      commands: [""]
    }
  ],
  [
    "vuepress",
    {
      distLocation: ["docs", ".vuepress", "dist"],
      commands: ["npm run docs-build"]
    }
  ],
  [
    "vue",
    {
      distLocation: [""],
      commands: [""]
    }
  ],
  [
    "nuxt",
    {
      distLocation: [""],
      commands: [""]
    }
  ],
  [
    "react",
    {
      distLocation: [""],
      commands: [""]
    }
  ],
  [
    "ember",
    {
      distLocation: [""],
      commands: [""]
    }
  ],
  [
    "svelte",
    {
      distLocation: [""],
      commands: [""]
    }
  ]
]);
const frameworks = new Set(frameworkDetails.keys());

type BuildInfo = FrameworkInfo & { framework?: string };

function getDetails(framework: string) {
  return { framework, ...frameworkDetails.get(framework) };
}

export const getProjectDetails = (framework?: string): BuildInfo => {
  if (framework) return getDetails(framework);

  const { pkg } = config;
  const dependencies = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies));
  const count: { [name: string]: string[] } = {};
  dependencies: for (const dep of dependencies) {
    for (const framework of frameworks) {
      if (dep.includes(framework)) {
        count[framework] ? count[framework].push(dep) : (count[framework] = [dep]);
        continue dependencies;
      }
    }
  }

  const sorted = Object.entries(count).sort(([, deps1], [, deps2]) => {
    if (deps1.length > deps2.length) return -1;
    if (deps1.length === deps2.length) return 0;
    if (deps1.length < deps2.length) return 1;
  });

  if (sorted.length === 0) return { distLocation: ["dist"], commands: ["npm run build"] };
  if (sorted.length === 1) {
    const name = sorted[0][0];
    return { framework: name, ...frameworkDetails.get(name) };
  }
  // look inclusive duplication (ex. vue/vuepress )
  const a = sorted[0][0];
  const b = sorted[1][0];
  const lengthOrdered = a.length >= b.length ? [a, b] : [b, a];
  if (sorted.length === 2 && lengthOrdered[0].includes(lengthOrdered[1])) {
    return getDetails(lengthOrdered[0]);
  }

  throw new Error(
    ">>>\n>>> no framework configured and multiple found. please checkout out how to explicitly set that in your config at https://devops.nomad.house"
  );
};
