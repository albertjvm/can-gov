const fetch = require("node-fetch");

exports.handler = function(event, context, callback) {
  const { url, ...rest } = event.queryStringParameters;
  const paramString = Object.keys(rest).map(k => `${k}=${rest[k]}`).join('&');
  const delim = url.indexOf('?') ? '&' : '?';

  console.log(`${url}${paramString.length ? delim : ''}${paramString}`);

  return fetch(`${url}${paramString.length ? delim : ''}${paramString}`, {
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
