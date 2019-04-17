const nodemailer = require('nodemailer');
const debug = require('./debug');
const { getConfig } = require('./config');
const Renderer = require('./Renderer');

async function sendEmail(args) {
  const { 0: email } = args;
  if (!email) throw new Error('You must specify an email to send, e.g. nextmail send my-email');

  const config = getConfig(process.cwd());
  debug('Send config: %o', config.send);

  const transporter = nodemailer.createTransport(config.send.smtpConfig);

  const renderer = new Renderer();
  const { html, subject, text } = await renderer.renderEmail(email, {});

  // setup email data with unicode symbols
  const mailOptions = Object.assign({}, config.send.mailOptions, { html, subject, text });

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
