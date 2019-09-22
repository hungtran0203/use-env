import * as s3 from './s3';
import * as gs from './gs';
import * as local from './local';

interface Loader {
  match: Function,
  load: Function,
};

const loaders : {[key: string]: Loader} = {
  s3,
  gs,
  local,
};

const resolveFileLoader = (envFilePath: string) => {
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

export default resolveFileLoader;
