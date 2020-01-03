const URL = "https://api.openparliament.ca";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "User-Agent": "albertjvm@gmail.com"
};

function transformPolitician(p) {
  return {
    name: p.name,
    url: p.url,
    id: p.url.split("/")[2],
    image: p.image,
    party: p.current_party.short_name.en,
    riding: p.current_riding.name.en,
    province: p.current_riding.province
  };
}

export default {
  getPoliticians: (includeFormer = false) => {
    return fetch(
      `${URL}/politicians/${includeFormer ? "?include=former" : ""}`,
      {
        headers: DEFAULT_HEADERS
      }
    )
      .then(response => response.json())
      .then(response => {
        return response.objects.map(transformPolitician);
      });
  },
  getBill: billUrl => {
    return fetch(`${URL}${billUrl}`, {
      headers: DEFAULT_HEADERS
    })
      .then(response => response.json())
      .then(response => {
        return response;
      });
  },
  searchByPostalCode: postalCode => {
    return (
      fetch(`${URL}/search?q=${postalCode}`, {
        mode: "no-cors",
        redirect: "manual",
        headers: DEFAULT_HEADERS
      })
        // .then(response => response.json())
        .then(response => console.log(response.url))
    );
  }
};
