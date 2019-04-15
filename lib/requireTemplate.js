const decache = require('decache');

const { NODE_ENV } = process.env;

function requireTemplate(rootDirectory, name) {
  const filePath = `${rootDirectory}/.nextmail/${name}`;

  if (NODE_ENV !== 'production') {
    decache(`${rootDirectory}/.nextmail/${name}`);
  }
  return require(filePath).default;
}

module.exports = requireTemplate;
