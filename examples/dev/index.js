const { renderEmail } = require('nextmail');

console.log('renderEmail', renderEmail('demo', { firstName: 'John' }));