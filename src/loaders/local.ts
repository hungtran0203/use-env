import * as fs from 'fs';
import { resolveEnvFilePath } from '../utils'


export const match = (fileName: string) => {
  const absolutePath = resolveEnvFilePath(fileName);
  if (fs.existsSync(absolutePath)) {
    return true;
  }
  return false;
};

export const load = async (fileName: string) => {
  const absolutePath = resolveEnvFilePath(fileName);
  // Get the file extension
  const file = fs.readFileSync(absolutePath, { encoding: 'utf8' });
  return file;
};