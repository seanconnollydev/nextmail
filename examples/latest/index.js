#!/usr/bin/env node
const path = require('path');
const { Renderer } = require('nextmail');

const rootDirectory = path.resolve(__dirname);
const renderer = new Renderer({ rootDirectory });

(async () => {
  // Sample data will come from here: https://jsonplaceholder.typicode.com/users/1
  console.log('renderEmail', await renderer.renderEmail('demo', { userId: 1 }));
})();
