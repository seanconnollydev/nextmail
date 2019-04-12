const url = require('url');
const qs = require('qs');
const Renderer = require('../../lib/Renderer');

const renderer = new Renderer();

const preview = {
  method: 'get',
  url: '/preview/:format/*template',
  handler: async (req, res, params) => {
    console.log('preview', params.template);

    const { query } = url.parse(req.url);
    console.log('query', query);
    const payload = qs.parse(query);
    console.log('payload', payload);

    const { html, text } = await renderer.renderEmail(params.template, payload);

    if (params.format === 'text') {
      return handleText(res, text);
    }

    return handleHtml(res, html);
  },
};

function handleText(res, text) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(text);
  res.end();
}

function handleHtml(res, html) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
}

module.exports = preview;
