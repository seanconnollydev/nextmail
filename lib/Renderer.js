const { render } = require('mjml-react');
const htmlToText = require('html-to-text');

class Renderer {
  constructor(options = {}) {
    this.pathPrefix = options.pathPrefix || process.cwd();
    console.log('this.pathPrefix', this.pathPrefix);
  }

  async renderEmail(name, props) {
    console.log('renderEmail', this);
    const Email = require(`${this.pathPrefix}/.nextmail/${name}`).default;
    const { html } = render(Email(props));
    const text = htmlToText.fromString(html);

    return { html, text };
  }
}

module.exports = Renderer;
