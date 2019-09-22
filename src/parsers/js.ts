import * as path from 'path';

export const match = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase()
  if (['.js'].includes(ext)) return true;
  return false;
};

export const parse = async (fileContent: string, { filePath } : { filePath : string }) => {
  const result = await require(filePath);
  return result;
};