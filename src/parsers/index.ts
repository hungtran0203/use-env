import * as path from 'path'
import { URL } from 'url';
// import { resolveEnvFilePath, isPromise } from './utils'

import * as js from './js';
import * as env from './env';
import * as json from './json';
import * as yaml from './yaml';

interface Parser {
  match: Function,
  parse: Function,
};

const parsers : {[key: string]: Parser} = {
  js,
  json,
  yaml,
  env,
};

const fileParser = (fileContent: string|object, { filePath } : { filePath : string }) => {
  // call loader matching method to find the appropriate loader
  const parserName = Object.keys(parsers).find(loaderName => {
    const parser = parsers[loaderName];
    const matched = parser.match(filePath);
    return matched;
  });
  // call loader resolve method to resole env data
  if (parserName) {
    return parsers[parserName].parse(fileContent, { filePath });
  }
  return null;
};

export default fileParser;
