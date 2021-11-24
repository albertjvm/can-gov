const URL = "https://api.openparliament.ca";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "User-Agent": "albertjvm@gmail.com"
};

export const getSpeechesForDate = async ({date}) => {
  let response = await fetch(
    `${URL}/speeches/?time__range=${date}+00%3A00%2C${date}+23%3A59&limit=500`,
    {
      headers: DEFAULT_HEADERS
    }
  );
  let json = await response.json();
  let objects = json.objects;

  while (json?.pagination?.next_url) {
    response = await fetch(
      `${URL}${json?.pagination?.next_url}`, { headers: DEFAULT_HEADERS }
    );
    json = await response.json();
    objects = [
      ...objects,
      ...json.objects
    ];
  }

  return objects.map(({attribution, h1, h2, content, politician_url, ...rest}) => ({
    ...rest,
    attribution: attribution.en,
    mp: politician_url?.split('/')[2],
    content: content?.en.replace(/<.*?>/g, ""),
    title: h1?.en,
    subtitle: h2?.en
  }));
};
