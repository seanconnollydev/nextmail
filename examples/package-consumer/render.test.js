const { renderer } = require('nextmail-package');

test('renders a demo', async () => {
  const { html } = await renderer.renderEmail('demo');
  console.log('html', html);
});
