const { receive, send } = require('../dist/');

/**
 * Echo Example
 *
 * Echoes back the user's messages.
 */

module.exports = function* echo(connection) {
  while(true) {
    const message = yield receive();
    yield send(message);
  }
}
