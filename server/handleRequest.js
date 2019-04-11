const http = require('http');
const { findRoute } = require('./routes');

const handleRequest = async (req, res) => {
  console.log('handleRequest', req.url);
  const route = findRoute(req.method.toLowerCase(), req.url.toLowerCase());

  if (route) {
    return await route.handler(req, res, route.params);
  }

  handle404(res);
};

const handle404 = (res) => {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write("404 Not Found\n");
  res.end();
}

module.exports = handleRequest;