const { receive, send } = require('../dist/');

/**
 * Greeter Example
 *
 * Greets a user and then disconnects.
 */

module.exports = function* greeter(connection) {
  yield send('Hi, what\'s your name?');
  const name = yield receive();
  yield send(`Hey ${name}!`);
}