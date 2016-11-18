const microWs = require('../dist/');
const { receive, send } = microWs;

function* greeter(connection) {
  yield send('Hi, what\'s your name?');
  const name = yield receive();
  yield send(`Hey ${name}!`);
}

microWs(greeter, { port: 3000 });

console.log('Server availible at ws://localhost:3000');
console.log('run "npm run wscat" to connect.');