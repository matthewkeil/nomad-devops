export const normalizeDomain = (domain: string) =>
  domain
    .toLowerCase()
    .split(".")
    .filter(zone => !!zone)
    .join(".");
