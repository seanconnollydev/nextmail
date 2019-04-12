const requireContext = require('require-context');

const root = process.cwd();

function getEmails() {
  const req = requireContext(`${root}/emails`, true, /\.js$/);
  return req.keys().filter(e => !e.startsWith('src'));
}

module.exports = getEmails;
