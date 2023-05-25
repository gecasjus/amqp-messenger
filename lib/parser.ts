const fs = require('fs'); //eslint-disable-line

export const readAndParseJSON = (path: string) =>
  JSON.parse(fs.readFileSync(path));
