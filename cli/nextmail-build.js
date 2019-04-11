const { buildAll } = require('../lib/build');

async function nextmailBuild() {
  await buildAll();
}

module.exports = nextmailBuild;
