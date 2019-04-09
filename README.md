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
function Demo() {
  return <div>Welcome to NextMail</div>
}

export default Demo
```

and then just run `npm run dev` and go to `http://localhost:3000`.
