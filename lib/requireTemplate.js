const decache = require('decache');

const { NODE_ENV } = process.env;
function requireTemplate(pathPrefix, name) {
  const filePath = `${pathPrefix}/.nextmail/${name}`;
  console.log('requireTemplate', NODE_ENV);
  if (NODE_ENV !== 'production') {
    console.log('deleting', filePath);
    decache(`${pathPrefix}/.nextmail/${name}`);
  }
  return require(filePath).default;
}

module.exports = requireTemplate;
