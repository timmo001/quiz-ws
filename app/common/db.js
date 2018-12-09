const Datastore = require('nedb');

const db = new Datastore();

const getSession = (session, cb) => {
  console.log(`Finding session ${session}..`);
  db.findOne({ session }, (err, doc) => {
    if (err) { cb('Error:', err); return; }
    if (!doc) { cb(`No session found for ${session}.`); return; }
    cb(doc);
  });
};

const addSession = (session, cb) => {
  console.log(`Creating session ${session.session}..`);
  db.insert(session,
    (err, newDoc) => err ? cb(err) : cb(null, newDoc)
  );
};

module.exports = {
  getSession,
  addSession
};
