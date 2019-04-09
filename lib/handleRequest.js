const http = require('http');
const pathToRegexp = require('path-to-regexp')
const renderEmail = require('./renderEmail');

const re = pathToRegexp('/preview/:format/:template');

const handleRequest = async (req, res) => {
  console.log('req', req.url);
  const parsed = re.exec(req.url);
  if (!parsed) handle404(res);

  const { 1: format, 2: template } = parsed;

  await new Promise((resolve, reject) => {
    const { html, text } = renderEmail(template, {});

    if (format === 'text') {
      handleText(res, text);
    } else {
      handleHtml(res, html);
    }

    resolve();
  });
};

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

const handle404 = (res) => {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write("404 Not Found\n");
  res.end();
}

module.exports = handleRequest;