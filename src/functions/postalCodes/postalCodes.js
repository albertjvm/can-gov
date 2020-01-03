const fetch = require("node-fetch");
const API_URL = "https://represent.opennorth.ca/postcodes";

exports.handler = function(event, context, callback) {
  const pc = "M6H2Z4";
  return fetch(`${API_URL}/${pc}`, {
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
