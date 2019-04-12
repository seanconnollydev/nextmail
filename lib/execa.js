const execa = require('execa');

const babelPath = require.resolve('@babel/cli/lib/babel');

async function buildWatch() {
  console.log('buildWatch');
  try {
    await execa('echo', ['Hello']);
    const { stdout } = await execa.shell(`echo "Hey" && node ${babelPath} emails --watch --config ./babel-preset.js --out-dir .nextmail`);
    console.log(stdout);
  } catch (err) {
    console.error('error', err);
  }
}

module.exports = { buildWatch };
