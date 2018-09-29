const request = require('superagent');

module.exports = (ws, req) => {
  request
    .get(`https://opentdb.com/api_category.php`)
    .retry(2)
    .timeout({
      response: 5000,
      deadline: 30000,
    })
    .then(res => {
      if (res.status === 200) {
        ws.send(JSON.stringify({ request: 'categories', data: res.body.trivia_categories }));
      } else console.error(`Error: ${res.status}: ${res.body}`);
    })
    .catch(err => {
      if (err.response) console.error(`Error: ${err.status} - ${err.response.text}`);
      else console.error(`Error: ${err}`);
    });
};
