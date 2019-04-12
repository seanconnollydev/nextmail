const { build } = require('../lib/build');

async function nextmailBuild() {
  await build();
}

module.exports = nextmailBuild;
