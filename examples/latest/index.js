#!/usr/bin/env node
const path = require('path');
const { Renderer } = require('nextmail');

const pathPrefix = path.resolve(__dirname);
const renderer = new Renderer({ pathPrefix });

(async () => {
  console.log('renderEmail', await renderer.renderEmail('demo', { firstName: 'John' }));
})();
