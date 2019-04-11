const { render } = require('mjml-react');
const htmlToText = require('html-to-text');

const root = process.cwd();

async function renderEmail(name, props, { pathPrefix } = {}) {
  const thePathPrefix = pathPrefix || root;
  const Email = require(`${thePathPrefix}/.nextmail/${name}`).default;
  const { html } = render(Email(props));
  const text = htmlToText.fromString(html);

  return { html, text };
}

module.exports = renderEmail;
