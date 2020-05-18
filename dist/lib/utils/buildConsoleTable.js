"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConsoleTable = void 0;
const SEPARATOR = "|";
const OUTPUT_WIDTH = 100;
// const columnAdjustment = [0, 0, 0, 0];
// const totalAdjustment = columnAdjustment.reduce((acc, val) => acc + Math.abs(val), 0);
const fullLine = () => {
    let line = "";
    for (let i = 0; i < OUTPUT_WIDTH; i++)
        line += "-";
    return line.concat("\n");
};
const buildColumnLayout = (numCols) => {
    const cols = [];
    // const separatorWidth = (numCols + 1) * SEPARATOR.length;
    const dataWidth = OUTPUT_WIDTH - (numCols + 1) * SEPARATOR.length;
    const intWidth = Math.floor(dataWidth / numCols);
    let intRemaining = dataWidth - intWidth * numCols;
    for (let i = 0; i < numCols; i++) {
        cols[i] = intWidth;
        if (!!intRemaining) {
            cols[i] += 1;
            intRemaining--;
        }
    }
    return cols;
};
const centerColumnItem = (columnWidth, data = "") => {
    const width = columnWidth - 2;
    const dataLength = data.length;
    let centered = "";
    if (dataLength >= width) {
        centered = data.slice(0, width);
    }
    else {
        const padding = width - Math.floor(dataLength);
        const half = padding / 2;
        const left = Math.floor(half);
        centered = data;
        for (let i = 0; i < left; i++)
            centered = " " + centered;
        for (let i = 0; i < (left === half ? half : left + 1); i++)
            centered = centered + " ";
    }
    return " " + centered + " ";
};
const buildRow = (row, colWidths, keys) => {
    function* enumerate(iterable) {
        let i = 0;
        if (Array.isArray(iterable)) {
            for (const item of row)
                yield [item, i++];
        }
        else {
            if (keys) {
                for (const key of keys)
                    yield [row[key], i++];
            }
            else {
                for (const item in row)
                    yield [row[item], i++];
            }
        }
    }
    let _row = SEPARATOR;
    for (const [item, index] of enumerate(row)) {
        _row += centerColumnItem(colWidths[index], item);
        _row += SEPARATOR;
    }
    return _row.concat("\n");
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emptyRow = (colWidths) => {
    let _row = SEPARATOR;
    for (const width of colWidths) {
        _row += centerColumnItem(width);
        _row += SEPARATOR;
    }
    return _row.concat("\n");
};
exports.buildConsoleTable = (table, keys) => {
    let _table = fullLine();
    const numCols = Array.isArray(table[0]) ? table[0].length : Object.keys(table[0]).length;
    const colWidths = buildColumnLayout(numCols);
    _table += buildRow(keys ? keys : Object.keys(table[0]), colWidths);
    _table += fullLine();
    for (const row of table) {
        _table += buildRow(row, colWidths, keys);
    }
    _table += fullLine();
    return _table;
};
//# sourceMappingURL=buildConsoleTable.js.map