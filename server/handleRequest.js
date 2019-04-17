const debug = require('../lib/debug');
const { findRoute } = require('./routes/routes');

const handleRequest = async (req, res) => {
  debug('handleRequest: %s', req.url);
  const route = findRoute(req.method.toLowerCase(), req.url.toLowerCase());

  if (route) {
    try {
      return await route.handler(req, res, route.params);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      return handle500(res);
    }
  }

  return handle404(res);
};

function handle404(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('404 Not Found\n');
  res.end();
}

function handle500(res) {
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.write('500 Internal Server Error\n');
  res.end();
}

module.exports = handleRequest;
