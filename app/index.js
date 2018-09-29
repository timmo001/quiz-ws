const WebSocket = require('ws'),
  uuid = require('uuid');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', incoming = (message) => {
      message = JSON.parse(message);
      switch (message.request) {
        case 'categories':
          require('./categories')(ws, message, {});
          break;
        case 'questions':
          require('./questions')(ws, message, {});
          break;
      }
    });

    ws.on('close', () => {
      // clearInterval(id);
    });
  });

};
