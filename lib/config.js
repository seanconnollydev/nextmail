const decache = require('decache');
const debug = require('./debug');

const { NODE_ENV } = process.env;

const defaultConfig = {};

function getConfig(rootDirectory) {
  const customConfig = _requireCustomConfig(rootDirectory);
  debug('Custom config: %o', customConfig);
  return Object.assign({}, defaultConfig, customConfig);
}

function _requireCustomConfig(rootDirectory) {
  const filePath = `${rootDirectory}/nextmail.config.js`;

  if (NODE_ENV !== 'production') {
    decache(filePath);
  }

  let module;
  try {
    module = require(filePath);
  } catch (e) {
    // Ignore
  }

  return module;
}

module.exports = { getConfig };
