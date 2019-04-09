const React = require('react');
const { render } = require('mjml-react');

const root = process.cwd();

function renderEmail(name, props) {
  const email = require(`${root}/.nextmail/${name}`).default;
  return render(email(props));
}

module.exports = renderEmail;