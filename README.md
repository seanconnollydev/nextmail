## How to use

### Setup

Install it:

```bash
npm install --save nextmail react react-dom
```

and add a script to your package.json like this:

```json
{
  "scripts": {
    "dev": "nextmail",
    "build": "nextmail build",
    "start": "nextmail start"
  }
}
```

After that, the file-system is the main API. Every `.js` file becomes an email that gets automatically processed and rendered.

Populate `./emails/demo.js` inside your project:

```jsx
import React from 'react';
import {
  Mjml, MjmlBody, MjmlColumn, MjmlSection, MjmlText,
} from 'nextmail/mjml-react';

function Demo() {
  return (
    <Mjml>
      <MjmlBody>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText align="center">Welcome to Nextmail!</MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}

export default Demo;

```

and then just run `npm run dev` and go to `http://localhost:6100` to view a preview.

## API

### `Renderer`

```
const renderer = new Renderer();
const { html, text, subject } = renderEmail('demo', {});
```

*Arguments*
- *template* (string): The name of the email template.
- *payload* (Object): Any dynamic data you need to interpolate in the email template (e.g. a user's name).

*Returns*
An `Object` with the following properties:
- *html* (string): The fully rendered html.
- *text* (string): The converted text of the email. `nextmail` uses [html-to-text](https://www.npmjs.com/package/html-to-text) for this conversion.
- *subject* (string): The fully rendered subject line.

#### Exporting `nextmail` templates as a package

You can build and export email templates as an `npm` package. In order to do this, you need to tell `nextmail` where to find the build templates with the `pathPrefix` option.
```
const path = require('path');
const { Renderer } = require('nextmail');

const renderer = new Renderer({ pathPrefix: path.resolve(__dirname) });

async function renderEmail(...args) {
  // You can also implement custom post-processing logic here too.
  return renderer.renderEmail(...args);
}

module.exports = { renderEmail };
```

## Fetch asynchronous data with `getInitialProps`

In similar fashion to [Next.js](https://nextjs.org), you can implement `getInitialProps` to asynchronously fetch data at render time.

```
function Demo() {
  ...
}

// payload = { userId: 1 }
Demo.getInitialProps = async ({ payload }) => {
  const { userId } = payload;
  const resp = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return { user: resp.data };
};
```

## Render email subjects with `getSubject`

Implement `getSubject` to hydrate the `subject` of the response to `renderEmail`. `getSubject` is called after `getInitialProps` and will have access to the initial props.

```
function Demo() {
  ...
}

// props = { user: { name: 'Leanne Graham' } }
Demo.getSubject = async ({ props }) => {
  const { user } = props;
  return `${user.name}! Act now!`; // Leanne Graham! Act now!
}
```

## Previews

The `nextmail dev` script allows you to view a preview of your email template.

The preview route follows this format: `/preview/:format/:template`
- `format` can be either `html` or `text`
- `template` is the file path for your template, e.g. if your file is found at `./emails/demo.js`, the `template` would be `demo`

##