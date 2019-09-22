"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { resolveEnvFilePath, isPromise } from './utils'
const js = require("./js");
const env = require("./env");
const json = require("./json");
const yaml = require("./yaml");
;
const parsers = {
    js,
    json,
    yaml,
    env,
};
const fileParser = (fileContent, { filePath }) => {
    // call loader matching method to find the appropriate loader
    const parserName = Object.keys(parsers).find(loaderName => {
        const parser = parsers[loaderName];
        const matched = parser.match(filePath);
        return matched;
    });
    // call loader resolve method to resole env data
    if (parserName) {
        return parsers[parserName].parse(fileContent, { filePath });
    }
    return null;
};
exports.default = fileParser;
