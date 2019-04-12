const { render } = require('mjml-react');
const htmlToText = require('html-to-text');
const requireTemplate = require('./requireTemplate');

class Renderer {
  constructor(options = {}) {
    this.pathPrefix = options.pathPrefix || process.cwd();
    console.log('this.pathPrefix', this.pathPrefix);
  }

  async renderEmail(name, payload) {
    console.log('payload', payload);

    const Template = requireTemplate(this.pathPrefix, name);
    console.log('Template', Template.displayName || Template.name);

    const props = typeof Template.getInitialProps === 'function'
      ? await Template.getInitialProps({ payload })
      : null;

    console.log('initialProps', props);

    const subject = typeof Template.getSubject === 'function'
      ? await Template.getSubject({ payload, props })
      : null;

    console.log('subject', subject);

    const { html } = render(Template(props));
    const text = htmlToText.fromString(html);

    return { html, subject, text };
  }
}

module.exports = Renderer;
