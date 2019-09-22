"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.match = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    if (['.json'].includes(ext))
        return true;
    return false;
};
exports.parse = async (fileContent) => {
    const result = JSON.parse(fileContent);
    return result;
};
