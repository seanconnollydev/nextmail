const http = require('http');
const handleRequest = require('./handleRequest');

const startServer = async () => {
  const server = http.createServer(handleRequest);

  await new Promise((resolve, reject) => {
    server.on('error', reject);
    server.on('listening', () => resolve());
    server.listen(3000);
  });
};

module.exports = startServer;