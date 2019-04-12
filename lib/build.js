const getOptions = require('@babel/cli/lib/babel/options').default;
const babelCli = require('@babel/cli/lib/babel/dir').default;
const babelOptions = require('./babel-preset');

const root = process.cwd();

async function build({ watch = false } = {}) {
  let options = getOptions([
    '',
    '',
    `${root}/emails`,
    '--out-dir',
    `${root}/.nextmail`,
    '--delete-dir-on-start',
    ...(watch ? ['--watch'] : []),
  ]);
  options = Object.assign({}, options, { babelOptions });

  await babelCli(options);
}

async function buildWatch() {
  return build({ watch: true });
}

module.exports = { build, buildWatch };
