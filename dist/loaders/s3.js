"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const aws_sdk_1 = require("aws-sdk");
const lodash_1 = require("lodash");
exports.match = (fileName) => {
    try {
        const fileUrl = new url_1.URL(fileName);
        if (fileUrl.protocol === 's3:')
            return true;
        return false;
    }
    catch (err) {
        return false;
    }
};
exports.load = (fileName) => new Promise((resolve, reject) => {
    const S3Instance = new aws_sdk_1.S3({
        signatureVersion: 'v4',
    });
    const fileUrl = new url_1.URL(fileName);
    const BUCKET = fileUrl.hostname;
    const KEY = lodash_1.trimStart(fileUrl.pathname, '/');
    S3Instance.getObject({ Bucket: BUCKET, Key: KEY }).promise()
        .then((data) => {
        const payload = data.Body.toString();
        resolve(payload);
    });
});
