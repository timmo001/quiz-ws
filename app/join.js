module.exports = (wss, req, db) => {
  db.getSession(req.session.toUpperCase(), session => {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({
        request: 'join',
        session: req.session,
        data: session
      }));
    });
  });
};
