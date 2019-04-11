const { buildTemplate } = require('../../lib/build');
const renderEmail = require('../../lib/renderEmail');

const preview = {
  method: 'get',
  url: '/preview/:format/*template',
  handler: async (req, res, params) => {
    console.log('preview', params.template);
    await buildTemplate(params.template);
    const { html, text } = await renderEmail(params.template, {});

    if (params.format === 'text') {
      return handleText(res, text);
    }

    return handleHtml(res, html);
  }
}

const handleText = (res, text) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(text);
  res.end();
}

const handleHtml = (res, html) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(html);
  res.end();
}

module.exports = preview;