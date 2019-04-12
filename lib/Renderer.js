const { render } = require('mjml-react');
const htmlToText = require('html-to-text');
const requireTemplate = require('./requireTemplate');

class Renderer {
  constructor(options = {}) {
    this.pathPrefix = options.pathPrefix || process.cwd();
    console.log('this.pathPrefix', this.pathPrefix);
  }

  async renderEmail(name, payload) {
    console.log('renderEmail', this);
    const Template = requireTemplate(this.pathPrefix, name);

    const props = typeof Template.getInitialProps === 'function'
      ? await Template.getInitialProps({ payload })
      : null;

    const subject = typeof Template.getSubject === 'function'
      ? await Template.getSubject({ payload, props })
      : null;

    const { html } = render(Template(props));
    const text = htmlToText.fromString(html);

    return { html, subject, text };
  }
}

module.exports = Renderer;
