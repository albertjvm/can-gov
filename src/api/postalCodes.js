const API_URL = "https://represent.opennorth.ca/postcodes";

export default {
  searchPostalCode: postalCode => {
    return fetch(`${API_URL}/${postalCode}`, {
      Accept: "application/json"
    })
      .then(response => response.json())
      .then(response => console.log(response));
  }
};
