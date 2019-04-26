const { renderer } = require('nextmail-package');

test('renders a demo', async () => {
  const { html } = await renderer.renderEmail('demo');
  expect(html).toBeDefined();
});
