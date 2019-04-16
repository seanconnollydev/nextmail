**Nextmail** makes it easy to leverage `React` and `MJML` to craft custom, dynamic email templates.

- Declarative, component-based model with [React](https://reactjs.org/)
- Responsive out of the box with [MJML](https://mjml.io/)
- Iterate quickly with browser previews
- Unit test with `jest` or however you choose, the same way you test your front end
- Fetch asynchronous data with `getInitialProps`, inspired by [Next.js](https://nextjs.org/)
- File based API, inspired by the `pages` model in [Next.js](https://nextjs.org/)

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
    "dev": "nextmail dev",
    "build": "nextmail build"
  }
}
```

After that, the file system is the main API. Every `.js` file becomes an email that gets automatically processed and rendered.

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

Generate email data with a single function call.
```javascript
const renderer = new Renderer();
const { html, text, subject } = renderEmail('demo', {});
```

**Arguments**
- **template** (string): The name of the email template.
- **payload** (Object): Any dynamic data you need to interpolate in the email template (e.g. a user's name).

**Returns**
An `Object` with the following properties:
- **html** (string): The fully rendered html.
- **text** (string): The converted text of the email. `nextmail` uses [html-to-text](https://www.npmjs.com/package/html-to-text) for this conversion.
- **subject** (string): The fully rendered subject line.

#### Exporting `nextmail` templates as a package

You can build and export email templates as an `npm` package. In order to do this, you need to tell `nextmail` where to find the build templates with the `rootDirectory` option.
```javascript
const path = require('path');
const { Renderer } = require('nextmail');

const renderer = new Renderer({ rootDirectory: path.resolve(__dirname) });

async function renderEmail(...args) {
  // You can also implement custom post-processing logic here too.
  return renderer.renderEmail(...args);
}

module.exports = { renderEmail };
```

## Fetch asynchronous data with `getInitialProps`

In similar fashion to [Next.js](https://nextjs.org), you can implement `getInitialProps` to asynchronously fetch data at render time.

```jsx
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

**Be careful** with this functionality. In many systems, emails are sent asynchronously. The underlying data store can change from when the email was triggered to when it is rendered. If you need the data to be locked in when the email is triggered, be sure that makes its way into the `payload`. If you are okay with using data that is later updated (e.g. the user changes their name), you can use `getInitialProps`.

## Render email subjects with `getSubject`

Implement `getSubject` to hydrate the `subject` of the response to `renderEmail`. `getSubject` is called after `getInitialProps` and will have access to the initial props.

```jsx
function Demo() {
  ...
}

// props = { user: { name: 'Leanne Graham' } }
Demo.getSubject = async ({ props }) => {
  const { user } = props;
  return `${user.name}! Act now!`; // Leanne Graham! Act now!
}
```

## Custom components

Custom `React` components allow you to implement reusable elements in your email templates. Since `Nextmail` is compiling emails in your `emails` directory, you need to place your components in a special directory called `src`.
```
/emails
  /src
    Header.js <---- This will compile
  demo.js
  /other
    NotCompiled.js <---- This will not
```

**Q**: Why not just include `Header.js` inside the `emails` directory?

**A**: `Nextmail` needs the ability to distinguish email templates from other components. For example, the preview index lists all available email templates to preview.

## Previews

The `nextmail dev` script allows you to view a preview of your email template.

The preview route follows this format: `/preview/:format/:template`
- `format` can be either `html` or `text`
- `template` is the file path for your template, e.g. if your file is found at `./emails/demo.js`, the `template` would be `demo`

## Static assets
Add static assets to the `/static` directory:
```
/emails
  demo.js
/static
  /bicycle.jpeg
```

Then you can reference them in your components:
```
<MjmlImage src="/static/bicycle.jpeg" />
```

For production, you will need to publish your assets to a known host and use absolute URLs in your components. One way you can do this is to add a `config.js` file under your `src` directory.
```
const isProd = process.env.NODE_ENV === 'production';

export default {
  assetPrefix: isProd ? 'https://nextmail-latest.now.sh' : '',
};

```

Then reference the `config` in your component.
```
import config from '../config';
function WithImage() {
  ...
    <MjmlImage src={`${config.assetPrefix}/static/bicycle.jpeg`} />
  ...
}
```

See the [with-image](/examples/latest/emails.with-image) example.

## Debugging
To see verbose log output, including captured payload, initial props, etc. when developing: `DEBUG=nextmail npm run dev`