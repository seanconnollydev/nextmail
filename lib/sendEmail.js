const nodemailer = require('nodemailer');
const debug = require('./debug');
const { getConfig } = require('./config');
const Renderer = require('./Renderer');

async function sendEmail(args) {
  const { 0: email, 1: payloadKey = 'default' } = args;
  if (!email) throw new Error('You must specify an email to send, e.g. nextmail send my-email');

  const config = getConfig();
  debug('Send config: %o', config.send);

  if (!config.send.smtpConfig) throw new Error('send.smtpConfig is required for sending.');

  const payload = config.payloads ? config.payloads[email][payloadKey] || {} : {};
  debug('Send payload: %o', payload);

  const renderer = new Renderer();
  const { html, subject, text } = await renderer.renderEmail(email, payload);

  const transporter = nodemailer.createTransport(config.send.smtpConfig);
  const mailOptions = Object.assign({}, config.send.mailOptions, { html, subject, text });

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
