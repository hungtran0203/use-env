import * as path from 'path';

const YAML = require('yamljs');

export const match = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase()
  if (['.yaml'].includes(ext)) return true;
  return false;
};

export const parse = async (fileContent: string) => {
  const result = YAML.parse(fileContent);
  return result;
};