export const buildDomainName = ({
  branch,
  subDomain,
  rootDomain,
  allowNaked = false
}: {
  branch: string;
  rootDomain: string;
  subDomain?: string;
  allowNaked?: boolean;
}) => {
  const url: string[] = [];
  if (branch !== "master") {
    url.push(branch);
  }
  if (subDomain && subDomain.length) {
    url.push(...subDomain.split(".").filter(zone => !!zone));
  }
  if (!url.length && !allowNaked) {
    url.push("www");
  }
  url.push(...rootDomain.split(".").filter(zone => !!zone));
  return url.join(".");
};
