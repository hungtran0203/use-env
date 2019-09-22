"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const YAML = require('yamljs');
exports.match = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    if (['.yaml'].includes(ext))
        return true;
    return false;
};
exports.parse = async (fileContent) => {
    const result = YAML.parse(fileContent);
    return result;
};
