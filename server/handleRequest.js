const { findRoute } = require('./routes/routes');

const handleRequest = async (req, res) => {
  console.log('handleRequest', req.url);
  const route = findRoute(req.method.toLowerCase(), req.url.toLowerCase());

  if (route) {
    return route.handler(req, res, route.params);
  }

  return handle404(res);
};

function handle404(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('404 Not Found\n');
  res.end();
}

module.exports = handleRequest;
