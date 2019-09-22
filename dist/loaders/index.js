"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3 = require("./s3");
const gs = require("./gs");
const local = require("./local");
;
const loaders = {
    s3,
    gs,
    local,
};
const resolveFileLoader = (envFilePath) => {
    // call loader matching method to find the appropriate loader
    const loaderName = Object.keys(loaders).find(loaderName => {
        const loader = loaders[loaderName];
        const matched = loader.match(envFilePath);
        return matched;
    });
    // call loader resolve method to resole env data
    if (loaderName) {
        return loaders[loaderName].load(envFilePath);
    }
    return null;
};
exports.default = resolveFileLoader;
