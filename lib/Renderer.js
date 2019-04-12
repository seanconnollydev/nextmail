const { render } = require('mjml-react');
const htmlToText = require('html-to-text');
const requireTemplate = require('./requireTemplate');

class Renderer {
  constructor(options = {}) {
    this.pathPrefix = options.pathPrefix || process.cwd();
    console.log('this.pathPrefix', this.pathPrefix);
  }

  async renderEmail(name, props) {
    console.log('renderEmail', this);
    const Template = requireTemplate(this.pathPrefix, name);
    const { html } = render(Template(props));
    const text = htmlToText.fromString(html);

    return { html, text };
  }
}

module.exports = Renderer;
