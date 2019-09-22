"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("./loaders");
const parsers_1 = require("./parsers");
/**
 * Gets the environment vars from an env file
 */
async function getEnvFileVars(envFilePath) {
    const fileContent = await loaders_1.default(envFilePath);
    if (!fileContent) {
        throw new Error(`Can not find env file path (${envFilePath}).`);
    }
    const env = await parsers_1.default(fileContent, { filePath: envFilePath });
    return env;
}
exports.getEnvFileVars = getEnvFileVars;
/**
 * Parse out all env vars from a given env file string and return an object
 */
function parseEnvString(envFileString) {
    // First thing we do is stripe out all comments
    envFileString = stripComments(envFileString.toString());
    // Next we stripe out all the empty lines
    envFileString = stripEmptyLines(envFileString);
    // Merge the file env vars with the current process env vars (the file vars overwrite process vars)
    return parseEnvVars(envFileString);
}
exports.parseEnvString = parseEnvString;
/**
 * Parse out all env vars from an env file string
 */
function parseEnvVars(envString) {
    const envParseRegex = /^((.+?)[=](.*))$/gim;
    const matches = {};
    let match;
    while ((match = envParseRegex.exec(envString)) !== null) {
        // Note: match[1] is the full env=var line
        const key = match[2].trim();
        const value = match[3].trim();
        // remove any surrounding quotes
        matches[key] = value
            .replace(/(^['"]|['"]$)/g, '')
            .replace(/\\n/g, '\n');
    }
    return matches;
}
exports.parseEnvVars = parseEnvVars;
/**
 * Strips out comments from env file string
 */
function stripComments(envString) {
    const commentsRegex = /(^#.*$)/gim;
    let match = commentsRegex.exec(envString);
    let newString = envString;
    while (match != null) {
        newString = newString.replace(match[1], '');
        match = commentsRegex.exec(envString);
    }
    return newString;
}
exports.stripComments = stripComments;
/**
 * Strips out newlines from env file string
 */
function stripEmptyLines(envString) {
    const emptyLinesRegex = /(^\n)/gim;
    return envString.replace(emptyLinesRegex, '');
}
exports.stripEmptyLines = stripEmptyLines;
