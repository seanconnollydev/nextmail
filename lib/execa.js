const execa = require('execa');

const getOptions = require('@babel/cli/lib/babel/options').default;
const babelCli = require('@babel/cli/lib/babel/dir').default;

console.log('babelCli', babelCli);
const babelOptions = require('./babel-preset');

const root = process.cwd();

async function buildWatch() {
  console.log('buildWatch');
  try {
    // const cliOptions = {
    //   filenames: ['demo.js'],
    //   deleteDirOnStart: true,
    //   watch: true,
    //   outDir: `${root}/.nextmail`,
    // };
    let options = getOptions([
      '',
      '',
      `${root}/emails`,
      '--out-dir',
      `${root}/.nextmail`,
      '--watch',
      '--delete-dir-on-start',
    ]);
    options = Object.assign({}, options, { babelOptions });

    await babelCli(options);
  } catch (err) {
    console.error('error', err);
  }
}

// async function buildWatch() {
//   console.log('buildWatch');
//   try {
//     await execa('echo', ['Hello']);
//     const { stdout } = await execa.shell(`echo "Hey" && node ${babelPath} emails --watch --config ./babel-preset.js --out-dir .nextmail`);
//     console.log(stdout);
//   } catch (err) {
//     console.error('error', err);
//   }
// }

module.exports = { buildWatch };
