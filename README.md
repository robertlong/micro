# Micro Websocket Experiment

Experiment for using JS generators as an API for a websocket microservice.

The idea and most of the code is from the awesome [Micro](https://github.com/zeit/micro) project by the wonderful people at [Zeit](https://zeit.co/).

As should go without saying. This is experimental code and shouldn't be used for anything.

If you have any ideas on how to make the API better or have an idea for a feature please create an issue or a PR.

## Example

The following example `echo.js` will echo back the sent message (without blocking!)

```js
const { receive, send } = require('micro-websocket-experiment');

module.exports = function* echo(connection) {
  while(true) {
    const message = yield receive();
    yield send(message);
  }
}
```

To run the microservice on port `3000`, use the `micro` command:

```bash
$ micro-ws -p 3000 echo.js
```

To run the microservice on port `3000` and localhost instead of listening on every interface, use the `micro` command:

```bash
$ micro-ws -p 3000 -H localhost echo.js
```

## Running an example from the repo

```
git clone https://github.com/robertlong/micro-websocket-experiment.git
npm install
npm run build
npm run example:echo
```

In another terminal window:

```
npm run wscat
```

## Documentation

### Installation

**Note**: `micro-websocket-experiment` requires Node `6.0.0` or later

Install from NPM:

```js
$ npm init
$ npm install micro-websocket-experiment --save
```

Then in your `package.json`:

```js
"main": "index.js",
"scripts": {
  "start": "micro-ws -p 3000"
}
```

Then write your `index.js` (see above for an example). To run your
app and make it listen on `http://localhost:3000` run:

```bash
$ npm start
```

### API

#### `microWs(fn, options, [callback])`

Used to serve a generator as a websocket server.

Options is passed directly to the [ws Server constructor](https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketserveroptions-callback).

You could use this to add verification with `verifyClient` or pass your own http server with `server`.

Callback is called when the server's port is assigned.

```
const microWs = require('micro-websocket-experiment');
```

#### `receive()`

Returns an object that the server will use to either wait for a websocket message to be received
or get a message from the message buffer.

The yielded value will be a message from the websocket connection.

```
const message = yield receive();
```

#### `send(message)`

Returns an object that the server will use to send a message using the websocket connection.

```
yield send('Hello World!');
```


