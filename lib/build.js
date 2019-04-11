const path = require('path');
const fs = require('fs');
const { transformFileAsync } = require('@babel/core');
const babelPreset = require('../lib/babel-preset');
const getEmails = require('../lib/getEmails');

const root = process.cwd();

async function buildAll() {
  getEmails().forEach(async (filename) => {
    await _buildFile(filename);
  });
}

async function buildTemplate(template) {
  return _buildFile(`${template}.js`);
}

async function _buildFile(filename) {
  console.log('Building...', filename);
  const srcFilePath = `${root}/emails/${filename}`;
  const destFilePath = `${root}/.nextmail/${filename}`;
  await _ensureDirectory(path.dirname(destFilePath));
  const result = await transformFileAsync(srcFilePath, babelPreset);

  return new Promise((resolve, reject) => {
    fs.writeFile(destFilePath, result.code, (err) => {
      if (err) reject(err);
      delete require.cache[require.resolve(destFilePath)];
      resolve();
    });
  });
}

async function _ensureDirectory(dir) {
  console.log('_ensureDirectory', dir);
  return new Promise((resolve, reject) => {
    fs.access(dir, fs.constants.F_OK, (notFound) => {
      if (notFound) {
        fs.mkdir(dir, { recursive: true }, (err) => {
          if (err) reject(err);
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

module.exports = { buildAll, buildTemplate };
