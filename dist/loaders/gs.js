"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const lodash_1 = require("lodash");
exports.match = (fileName) => {
    try {
        const fileUrl = new url_1.URL(fileName);
        if (fileUrl.protocol === 'gs:')
            return true;
        return false;
    }
    catch (err) {
        return false;
    }
};
exports.load = (fileName) => new Promise((resolve, reject) => {
    const { Storage } = require('@google-cloud/storage');
    const storage = new Storage();
    const fileUrl = new url_1.URL(fileName);
    const BUCKET = fileUrl.hostname;
    const KEY = lodash_1.trimStart(fileUrl.pathname, '/');
    const file = storage.bucket(BUCKET).file(KEY);
    file.download((err, content) => {
        if (!err) {
            resolve(content.toString());
        }
    });
});
