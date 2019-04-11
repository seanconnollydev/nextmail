const path = require('path');
const fs = require('fs');
var requireContext = require('require-context');
const { transformFileAsync } = require('@babel/core');
const babelPreset = require('../lib/babel-preset');

const root = process.cwd();

async function buildAll() {
  await _ensureBuildDirectory();

  const req = requireContext(`${root}/emails`, true, /\.js$/);

  req.keys().forEach(async (filename) => {
    await buildTemplate(filename);
  });
};

async function buildTemplate(template) {
  await _ensureBuildDirectory();
  return _buildFile(`${template}.js`);
}

async function _buildFile(filename) {
  console.log('Building...', filename);
  const result = await transformFileAsync(`${root}/emails/${filename}`, babelPreset);

  return new Promise((resolve, reject) => {
    fs.writeFile(`${root}/.nextmail/${filename}`, result.code, (err) => {
      if (err) reject(err);
      resolve();
    });
  })
}

async function _ensureBuildDirectory() {
  return new Promise((resolve, reject) => {
    fs.access(`${root}/.nextmail`, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(`${root}/.nextmail`, (err) => {
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
