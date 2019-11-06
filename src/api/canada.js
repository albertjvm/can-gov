function transformPolitician(p) {
  return {
    name: p.name,
    url: p.url,
    image: p.image,
    party: p.current_party.short_name.en,
    riding: p.current_riding.name.en,
    province: p.current_riding.province,
  };
}

export default {
  getPoliticians: (includeFormer = false) => {
    return fetch(`https://api.openparliament.ca/politicians/${includeFormer ? '?include=former' : ''}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        return response.objects.map(transformPolitician);
      });
  },
}