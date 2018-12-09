const WebSocket = require('ws'),
  db = require('./common/db');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', incoming = (message) => {
      message = JSON.parse(message);
      console.log('message:', message);
      switch (message.request) {
        case 'session':
          require('./session')(ws, message, db, {});
          break;
        case 'join':
          require('./join')(wss, message, db, {});
          break;
        case 'categories':
          require('./categories')(ws, message, {});
          break;
        case 'questions':
          require('./questions')(wss, message, {});
          break;
        case 'ready':
          require('./ready')(wss, message, {});
          break;
      }
    });

    ws.on('close', (code, reason) => {
      console.log('Client closed connection. Code:', code, 'Reason:', reason);
    });
  });

};
