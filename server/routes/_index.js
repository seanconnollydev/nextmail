const qs = require('qs');
const { html } = require('common-tags');
const { getConfig } = require('../../lib/config');
const getEmails = require('../../lib/getEmails');

const config = getConfig();

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
              margin: 0.8rem 0;
            }
          </style>
        </head>
        <body>
          ${emails.map(email => `
            <div class="email">
              <h4>${email}</h4>
              ${renderLinks(email)}
            </div>
          `)}
        </body>
      </html>
    `;

    res.write(str);
    res.end();
  },
};

function renderLinks(email) {
  const payloads = config.payloads[email] || { default: {} };

  /* eslint-disable indent */
  return `
    <ul>
      ${Object.keys(payloads).map((key) => {
        const payload = payloads[key];
        const query = qs.stringify(payload);
        return `
          <li>
            <span>
              <a href="/preview/html/${email}?${query}">${key}</a>
            </span>
            <span>
              (<a href="/preview/text/${email}?${query}">text</a>)
            </span>
          </li>
        `;
      })}
    </ul>
  `;
  /* eslint-disable indent */
}

module.exports = index;
