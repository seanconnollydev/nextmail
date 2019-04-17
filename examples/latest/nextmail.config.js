const { MAILTRAP_USER, MAILTRAP_PASSWORD } = process.env;

module.exports = {
  send: {
    smtpConfig: {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASSWORD,
      },
    },
    mailOptions: {
      from: 'from@example.com',
      to: 'to@example.com',
    },
  },
};
