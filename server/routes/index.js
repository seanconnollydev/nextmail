const Route = require('route-parser');
const preview = require('./preview');

const routes = [preview].map(rt => Object.assign({}, rt, {
  url: new Route(rt.url),
}));

const findRoute = (method, url) => {
  const route = routes.find(route => {
    return route.method === method && route.url.match(url);
  });

  if (!route) return null;

  return { handler: route.handler, params: route.url.match(url) };
};

module.exports = { findRoute };