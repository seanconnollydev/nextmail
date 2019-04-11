const { html } = require('common-tags');
const getEmails = require('../../lib/getEmails');

const index = {
  method: 'get',
  url: '/',
  handler: async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const emails = getEmails().map(e => e.slice(0, -3));

    const str = html`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            html {
              font-family: Arial;
              font-size: 18px;
            }

            body {
              padding: 0 2rem;
            }

            a {
              text-decoration: none;
              color: #11BC3E;
            }

            .email {
              margin: 1.2rem 0;
            }
          </style>
        </head>
        <body>
          <h1>Nextmail</h1>
          ${emails.map(email => `
            <div class="email">
              <span>
                <a href="/preview/html/${email}">${email}</a>
              </span>
              <span>
                (<a href="/preview/text/${email}">text</a>)
              </span>
            </div>
          `)}
        </body>
      </html>
    `;

    res.write(str);
    res.end();
  },
};

module.exports = index;
