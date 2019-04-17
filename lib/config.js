const decache = require('decache');
const debug = require('./debug');

const { NODE_ENV } = process.env;
const root = process.cwd();

const defaultConfig = {
  payloads: {},
};

function getConfig() {
  const customConfig = _requireCustomConfig();
  debug('Custom config: %o', customConfig);
  return Object.assign({}, defaultConfig, customConfig);
}

function _requireCustomConfig() {
  const filePath = `${root}/nextmail.config.js`;

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
