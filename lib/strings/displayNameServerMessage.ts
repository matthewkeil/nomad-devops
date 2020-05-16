import { DomainRecords } from "../utils";
import { ZoneInfo } from "../aws";

const formatNs = (nameServers: string[]) => {
  let stringified = "";
  let i = 0;
  for (const ns of nameServers) stringified += `>   ${++i}) ${ns}\n`;
  return stringified;
};
export const displayNameServerMessage = (
  domain: string,
  nslookup: DomainRecords["ns"],
  zoneInfo: ZoneInfo["ns"]
) => {
  const defaultList = ["", "", "", ""];
  const lookup = formatNs(nslookup && nslookup.size ? [...nslookup] : defaultList);
  const zone = formatNs(zoneInfo && zoneInfo.size ? [...zoneInfo] : defaultList);
  return (
    `>>>
  >>>
  >>>
  >>> We noticed that the name servers that return from nslookup
  >>>
  >
  ` +
    lookup +
    `>
  >>>
  >>> for ${domain} don't match the name servers
  >>> associated with the deployed system. This also occurs when
  >>> setting things up for the first time. Please update
  >>> your domain registrar to use the following name servers
  >>>
  >
  ` +
    zone +
    `>
  >>>
  >>> If you are unsure how to make that happen, you can find
  >>> information on how to do this at
  >>>
  >>> https://devops.nomad.house
  >>> - or - 
  >>> https://github.com/matthewkeil/nomad-devops
  >>>
  >>>`
  );
};
