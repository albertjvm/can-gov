const API_URL =
  "https://knowyouronions.albertjvm.ca/.netlify/functions/postalCodes";

export const searchPostalCode = async postalCode => {
  const response = await fetch(`${API_URL}?postalCode=${postalCode}`, {
    Accept: "application/json"
  });
  const response_1 = await response.json();
  return {
    representatives: response_1.representatives_centroid,
    province: response_1.province,
    city: response_1.city
  };
};

