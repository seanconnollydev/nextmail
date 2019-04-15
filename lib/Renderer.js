const { render } = require('mjml-react');
const htmlToText = require('html-to-text');
const debug = require('./debug');
const requireTemplate = require('./requireTemplate');

class Renderer {
  constructor(options = {}) {
    this.rootDirectory = options.rootDirectory || process.cwd();
    debug('rootDirectory: %s', this.rootDirectory);
  }

  async renderEmail(name, payload) {
    debug('renderEmail name: %s', name);
    debug('renderEmail payload: %o', payload);

    const Template = requireTemplate(this.rootDirectory, name);
    debug('Template: %s', Template.displayName || Template.name);

    const props = typeof Template.getInitialProps === 'function'
      ? await Template.getInitialProps({ payload })
      : null;

    debug('props: %o', props);

    const subject = typeof Template.getSubject === 'function'
      ? await Template.getSubject({ payload, props })
      : null;

    debug('subject: %s', subject);

    const { html } = render(Template(props));
    const text = htmlToText.fromString(html);

    return { html, subject, text };
  }
}

module.exports = Renderer;
