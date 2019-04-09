const path = require('path');
const fs = require('fs').promises;
var requireContext = require('require-context');
const { transformFileAsync } = require('@babel/core');
const babelPreset = require('../lib/babel-preset');

async function nextmailBuild() {
  const root = process.cwd();
  fs.mkdir(`${root}/.nextmail`, { recursive: true });

  const req = requireContext(`${root}/emails`, true, /\.js$/);

  req.keys().forEach(async (filename) => {
    const result = await transformFileAsync(`${root}/emails/${filename}`, babelPreset);
    await fs.writeFile(`${root}/.nextmail/${filename}`, result.code);
  });
};

module.exports = nextmailBuild;
