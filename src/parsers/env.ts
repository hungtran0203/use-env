import * as path from 'path';

export const match = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase()
  if (['', '.env'].includes(ext)) return true;
  return false;
};

export const parse = async (fileContent: string) => {
  const result = parseEnvString(fileContent);
  return result;
};


/**
 * Parse out all env vars from a given env file string and return an object
 */
function parseEnvString (envFileString: string): { [key: string]: string } {
  // First thing we do is stripe out all comments
  envFileString = stripComments(envFileString.toString())

  // Next we stripe out all the empty lines
  envFileString = stripEmptyLines(envFileString)

  // Merge the file env vars with the current process env vars (the file vars overwrite process vars)
  return parseEnvVars(envFileString)
}

/**
 * Parse out all env vars from an env file string
 */
function parseEnvVars (envString: string): { [key: string]: string } {
  const envParseRegex = /^((.+?)[=](.*))$/gim
  const matches: { [key: string]: string } = {}
  let match
  while ((match = envParseRegex.exec(envString)) !== null) {
    // Note: match[1] is the full env=var line
    const key = match[2].trim()
    const value = match[3].trim()

    // remove any surrounding quotes
    matches[key] = value
      .replace(/(^['"]|['"]$)/g, '')
      .replace(/\\n/g, '\n')
  }
  return matches
}

/**
 * Strips out comments from env file string
 */
function stripComments (envString: string): string {
  const commentsRegex = /(^#.*$)/gim
  let match = commentsRegex.exec(envString)
  let newString = envString
  while (match != null) {
    newString = newString.replace(match[1], '')
    match = commentsRegex.exec(envString)
  }
  return newString
}

/**
 * Strips out newlines from env file string
 */
function stripEmptyLines (envString: string): string {
  const emptyLinesRegex = /(^\n)/gim
  return envString.replace(emptyLinesRegex, '')
}
