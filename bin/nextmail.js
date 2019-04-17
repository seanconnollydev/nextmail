#!/usr/bin/env node
const { argv } = require('yargs');

(async () => {
  const command = argv._[0];
  const forwardedArgs = argv._.slice(1);

  if (command === 'build') {
    await require('../cli/nextmail-build')(forwardedArgs);
  } else if (command === 'start') {
    await require('../cli/nextmail-start')(forwardedArgs);
  } else if (command === 'send') {
    await require('../cli/nextmail-send')(forwardedArgs);
  } else {
    await require('../cli/nextmail-dev')(forwardedArgs);
  }
})();
