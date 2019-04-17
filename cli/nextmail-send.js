const sendEmail = require('../lib/sendEmail');

async function nextmailSend(args) {
  return sendEmail(args);
}

module.exports = nextmailSend;
