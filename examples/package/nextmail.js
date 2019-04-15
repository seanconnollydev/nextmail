const path = require('path');
const { Renderer } = require('nextmail');

const rootDirectory = path.resolve(__dirname);
const renderer = new Renderer({ rootDirectory });

module.exports = { renderer };
