const fs = require('fs');
const path = require('path');
const debug = require('../../lib/debug');

const root = process.cwd();

// maps file extention to MIME types
const mimeType = {
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt',
};

const staticRoute = {
  method: 'get',
  url: '/static/:path',
  handler: async (req, res, params) => {
    debug('/static url: %o:', req.url);

    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    // by limiting the path to current directory only
    const sanitizePath = path.normalize(params.path).replace(/^(\.\.[\/\\])+/, ''); // eslint-disable-line no-useless-escape
    let pathname = path.join(root, '/static', sanitizePath);

    debug('/static pathname: %o:', pathname);
    fs.exists(pathname, (exist) => {
      if (!exist) {
      // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }

      // if is a directory, then look for index.html
      if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
      }

      // read file from file system
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
          const { ext } = path.parse(pathname);
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', mimeType[ext] || 'text/plain');
          res.end(data);
        }
      });
    });
  },
};

module.exports = staticRoute;
