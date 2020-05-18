declare type RowMap = {
    [key: string]: string | Date;
};
declare type Row = string[] | RowMap;
declare type Table = Row[];
export declare const buildConsoleTable: (table: Table, keys?: string[]) => string;
export {};
