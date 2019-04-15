#!/usr/bin/env node
const { argv } = require('yargs');

const command = argv._[0];

if (command === 'build') {
  require('../cli/nextmail-build')();
} else if (command === 'start') {
  require('../cli/nextmail-start')();
} else {
  require('../cli/nextmail-dev')();
}
