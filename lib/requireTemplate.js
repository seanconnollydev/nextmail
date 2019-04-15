const decache = require('decache');

const { NODE_ENV } = process.env;

function requireTemplate(rootDirectory, name) {
  const filePath = `${rootDirectory}/.nextmail/${name}`;

  if (NODE_ENV !== 'production') {
    decache(filePath);
  }
  return require(filePath).default;
}

module.exports = requireTemplate;
