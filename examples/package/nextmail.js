const path = require('path');
const { Renderer } = require('nextmail');

const pathPrefix = path.resolve(__dirname);
const renderer = new Renderer({ pathPrefix });

module.exports = { renderer };
