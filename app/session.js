
const makeid = () => {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = (ws, req) => {
  ws.send(JSON.stringify({ request: 'session', data: { id: makeid() } }));
};
