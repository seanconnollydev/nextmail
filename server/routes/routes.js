const Route = require('route-parser');
const index = require('./_index');
const preview = require('./preview');

const routes = [preview, index].map(rt => Object.assign({}, rt, {
  url: new Route(rt.url),
}));

const findRoute = (method, url) => {
  const route = routes.find(rt => rt.method === method && rt.url.match(url));

  if (!route) return null;

  return { handler: route.handler, params: route.url.match(url) };
};

module.exports = { findRoute };
