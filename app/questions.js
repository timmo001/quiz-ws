module.exports = (wss, req) => {
  const { session, amount, category, difficulty, type } = req;

  require('./common/questions')(amount, category, difficulty, type, result => {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({
        request: 'questions',
        session,
        data: result
      }));
    });
  });
};
