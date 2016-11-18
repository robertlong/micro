const microWs = require('../dist/');
const { receive, send } = microWs;

function* echo(connection) {
  while(true) {
    const message = yield receive();
    console.log('User sent:', message);

    console.log('Sending back:', message);
    yield send(message);
  }
}

microWs(echo, { port: 3000 });

console.log('Server availible at ws://localhost:3000');
console.log('run "npm run wscat" to connect.');
