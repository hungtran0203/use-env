import { URL } from 'url';
import { trimStart } from 'lodash';

export const match = (fileName: string) => {
  try {
    const fileUrl = new URL(fileName);
    if (fileUrl.protocol === 'gs:') return true;
    return false;  
  } catch (err) {
    return false;
  }
};

export const load = (fileName: string) => new Promise((resolve, reject) => {
  const { Storage } = require('@google-cloud/storage');
  const storage = new Storage();
  const fileUrl = new URL(fileName);

  const BUCKET = fileUrl.hostname;
  const KEY = trimStart(fileUrl.pathname, '/');
  const file = storage.bucket(BUCKET).file(KEY);
  file.download((err: any, content: any) => {
    if(!err) {
      resolve(content.toString());  
    }
  })
});