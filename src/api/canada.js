const URL = "https://api.openparliament.ca";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "User-Agent": "albertjvm@gmail.com"
};

const transformPolitician = ({ name, url, image, current_party, current_riding}) => ({
  name,
  url,
  id: url.split("/")[2],
  image,
  party: current_party.short_name.en,
  riding: current_riding.name.en,
  province: current_riding.province
});

  export const getPoliticians = async (includeFormer = false) => {
    const response = await fetch(
      `${URL}/politicians/${includeFormer ? "?include=all" : ""}`,
      {
        headers: DEFAULT_HEADERS
      }
    );
    const json = await response.json();
    return json.objects.map(transformPolitician);
  };

  export const getVotes = async ({limit = 500, offset = 0}) => {
    const response = await fetch(
      `${URL}/votes/?limit=${limit}&offset=${offset}`, {
        headers: DEFAULT_HEADERS
      }
    );
    const json = await response.json();
    return json.objects;
  };

  export const getVote = async ({number, session}) => {
    const response = await fetch(
      `https://knowyouronions.albertjvm.ca/.netlify/functions/cors?url=${URL}/votes/${session}/${number}`, {
        headers: DEFAULT_HEADERS
      }
    );
    const json = await response.json();
    console.log(json);
    return json.objects;
  };

  export const getBill = async billUrl => {
    const response = await fetch(`${URL}${billUrl}`, {
      headers: DEFAULT_HEADERS
    });
    const json = await response.json();
    return json;
  };

