"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.match = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    if (['.js'].includes(ext))
        return true;
    return false;
};
exports.parse = async (fileContent, { filePath }) => {
    const result = await require(filePath);
    return result;
};
