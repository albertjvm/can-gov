const fetch = require("node-fetch");

exports.handler = function(event, context, callback) {
  const url = event.queryStringParameters.url;
  return fetch(url, {
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
