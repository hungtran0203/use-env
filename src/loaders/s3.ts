import { URL } from 'url';
import { S3 } from 'aws-sdk';
import { trimStart } from 'lodash';

export const match = (fileName: string) => {
  try {
    const fileUrl = new URL(fileName);
    if (fileUrl.protocol === 's3:') return true;
    return false;  
  } catch (err) {
    return false;
  }
};

export const load = (fileName: string) => new Promise((resolve, reject) => {

  const S3Instance = new S3({
    signatureVersion: 'v4',
  });
  
  const fileUrl = new URL(fileName);

  const BUCKET = fileUrl.hostname;
  const KEY = trimStart(fileUrl.pathname, '/');

  S3Instance.getObject({ Bucket: BUCKET, Key: KEY }).promise()
    .then((data: any) => {
      const payload = data.Body.toString();
      resolve(payload);
    })

});