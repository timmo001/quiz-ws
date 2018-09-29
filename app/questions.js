const request = require('superagent');

module.exports = (ws, req) => {
  request
    .get(`https://opentdb.com/api.php?${req.amount ?
      `amount=${req.amount}` : ''}${req.category ?
        `&category=${req.category}` : ''}${req.difficulty ?
          `&difficulty=${req.difficulty}` : ''}${req.type ?
            `&type=${req.type}` : ''}`)
    .retry(2)
    .timeout({
      response: 5000,
      deadline: 30000,
    })
    .then(res => {
      if (res.status === 200) {
        ws.send(JSON.stringify({ request: 'questions', data: res.body.results }));
      } else console.error(`Error: ${res.status}: ${res.body}`);
    })
    .catch(err => {
      if (err.response) console.error(`Error: ${err.status} - ${err.response.text}`);
      else console.error(`Error: ${err}`);
    });
};
