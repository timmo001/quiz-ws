module.exports = (ws, req, db) => {
  db.getSession(req.id, (_err, session) =>
    ws.send(JSON.stringify({ request: 'join', data: session }))
  );
};
