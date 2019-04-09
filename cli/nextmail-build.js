const path = require('path');
const fs = require('fs').promises;
const { transformFileAsync } = require('@babel/core');
const babelPreset = require('../lib/babel-preset');

async function nextmailBuild() {
  const root = process.cwd();
  fs.mkdir(`${root}/.nextmail/emails`, { recursive: true });
  const result = await transformFileAsync(`${root}/emails/demo.js`, babelPreset);
  await fs.writeFile(`${root}/.nextmail/emails/demo.js`, result.code);
};

module.exports = nextmailBuild;
