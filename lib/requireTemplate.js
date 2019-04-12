const decache = require('decache');

const { NODE_ENV } = process.env;

function requireTemplate(pathPrefix, name) {
  const filePath = `${pathPrefix}/.nextmail/${name}`;

  if (NODE_ENV !== 'production') {
    decache(`${pathPrefix}/.nextmail/${name}`);
  }
  return require(filePath).default;
}

module.exports = requireTemplate;
