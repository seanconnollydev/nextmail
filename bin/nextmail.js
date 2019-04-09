#!/usr/bin/env node
const argv = require('yargs').argv;

const command = argv._[0];

if (command === 'build') {
  require('../cli/nextmail-build')();
} else {
  require('../cli/nextmail-dev')();
}