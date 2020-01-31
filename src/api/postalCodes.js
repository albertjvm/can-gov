const API_URL =
  "https://knowyouronions.albertjvm.ca/.netlify/functions/postalCodes";

export default {
  searchPostalCode: postalCode => {
    return fetch(`${API_URL}?postalCode=${postalCode}`, {
      Accept: "application/json"
    })
      .then(response => response.json())
      .then(response => response.representatives_centroid);
  }
};
