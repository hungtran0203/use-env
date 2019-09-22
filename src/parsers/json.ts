import * as path from 'path';

export const match = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase();
  if (['.json'].includes(ext)) return true;
  return false;
};

export const parse = async (fileContent: string) => {
  const result = JSON.parse(fileContent);
  return result;
};