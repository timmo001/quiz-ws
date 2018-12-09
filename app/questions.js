const request = require('superagent');

module.exports = (wss, req) => {
  const { session, amount, category, difficulty, type } = req;

  request
    .get(`https://opentdb.com/api.php?${amount ?
      `amount=${amount}` : ''}${category ?
        `&category=${category}` : ''}${difficulty ?
          `&difficulty=${difficulty}` : ''}${type ?
            `&type=${type}` : ''}`)
    .retry(2)
    .timeout({
      response: 5000,
      deadline: 30000,
    })
    .then(res => {
      if (res.status === 200) {
        wss.clients.forEach(function each(client) {
          client.send(JSON.stringify({
            request: 'questions',
            session, data: res.body.results
          }));
        });

      } else console.error(`Error: ${res.status}: ${res.body}`);
    })
    .catch(err => {
      if (err.response) console.error(`Error: ${err.status} - ${err.response.text}`);
      else console.error(`Error: ${err}`);
    });
};
