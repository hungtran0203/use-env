"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("../utils");
exports.match = (fileName) => {
    const absolutePath = utils_1.resolveEnvFilePath(fileName);
    if (fs.existsSync(absolutePath)) {
        return true;
    }
    return false;
};
exports.load = async (fileName) => {
    const absolutePath = utils_1.resolveEnvFilePath(fileName);
    // Get the file extension
    const file = fs.readFileSync(absolutePath, { encoding: 'utf8' });
    return file;
};
