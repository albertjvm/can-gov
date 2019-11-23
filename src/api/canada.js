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
      `https://api.openparliament.ca/politicians/${
        includeFormer ? "?include=former" : ""
      }`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "albertjvm@gmail.com"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        return response.objects.map(transformPolitician);
      });
  },
  getBill: billUrl => {
    return fetch(`https://api.openparliament.ca${billUrl}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "albertjvm@gmail.com"
      }
    })
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }
};
