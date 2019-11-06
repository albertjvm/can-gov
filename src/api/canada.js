export default {
  getPoliticians: (includeFormer = false) => {
    return fetch(`https://api.openparliament.ca/politicians/${includeFormer ? '?include=former' : ''}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        return response.objects;
      });
  },
}