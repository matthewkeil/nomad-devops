import logUpdate from "log-update";

interface Output {
  log?: string | string[];
  table?: string;
}

const CURRENT = {
  table: undefined,
  logs: []
};

export const output = ({ table, log }: Output): void => {
  if (!table) {
    return void (Array.isArray(log) ? log.map(console.log) : console.log(log));
  }
  if (log) CURRENT.logs.push(...log);
  CURRENT.table = table;
  logUpdate(CURRENT.logs.join("\n").concat(table));
};
