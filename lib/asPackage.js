const path = require('path');
const renderEmail = require('./renderEmail');

function asPackage() {
  const pathPrefix = path.resolve(__dirname);
  return (...args) => {
    renderEmail(...args, { pathPrefix });
  };
}

module.exports = asPackage;
