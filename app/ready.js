module.exports = (wss, req) => {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({
      request: 'ready',
      session: req.session
    }));
  });
};
