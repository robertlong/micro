const Server = require('ws').Server;

const SEND = 'SEND';
const RECEIVE = 'RECEIVE';

function serve(fn, options, callback) {
  const server = new Server(options, callback);

  server.on('connection', (ws) => {
    run(ws, fn);
  });

  return server;
}

function* messageBuffer(ws) {
  const requestedPromises = [];
  const completedPromises = [];

  ws.on('message', (data) => {
    if (requestedPromises.length > 0) {
      let [resolve, ] = requestedPromises.shift();

      resolve(data);
    } else {
      completedPromises.push(Promise.resolve(data));
    }
  });

  while (true) {
    if (completedPromises.length > 0) {
      yield completedPromises.shift();
    } else {
      yield new Promise((resolve, reject) => requestedPromises.push([resolve, reject]));
    }
  }
}

async function run(ws, fn) {
  const actionIter = fn(ws);
  const messagesIter = messageBuffer(ws);

  let nextVal;

  while(true) {
    const { value, done } = actionIter.next(nextVal);

    if (done) {
      break;
    } else {
      nextVal = await processAction(ws, messagesIter, value);
    }
  }

  ws.close();
}

async function processAction(ws, messagesIter, action) {
  switch(action.type) {
    case SEND:
      return ws.send(action.payload);
    case RECEIVE:
      const { value } = messagesIter.next();
      return await value;
    default:
      return;
  }
}

function send(payload) {
  return {
    type: SEND,
    payload
  };
}

function receive() {
  return {
    type: RECEIVE
  };
}

module.exports = exports = serve;
module.exports.run = run
module.exports.send = send;
module.exports.receive = receive;