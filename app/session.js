
const makeid = () => {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text.toUpperCase();
}

module.exports = (ws, req, db) => {
  const session = makeid();
  const { amount, category, difficulty, type } = req;
  db.addSession({
    session, amount, category, difficulty, type
  }, (_err, _id) =>
      ws.send(JSON.stringify({
        request: 'session', data: {
          session, amount, category, difficulty, type
        }
      }))
  );
};
