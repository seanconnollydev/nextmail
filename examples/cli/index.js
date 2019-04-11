#!/usr/bin/env node
const path = require('path');
const { renderEmail } = require('nextmail');

(async () => {
  const pathPrefix = path.resolve(__dirname);
  console.log('renderEmail', await renderEmail('demo', { firstName: 'John' }, { pathPrefix }));
})();
