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

const transformVote = ({
  description, 
  nay_total, 
  yea_total, 
  paired_total,
  party_votes,
  result,
  date
}) => ({
  description: description.en,
  nay_total,
  yea_total,
  paired_total,
  party_votes: party_votes.map(({vote, party, disagreement}) => ({
    vote,
    disagreement,
    party: party.short_name.en
  })),
  result,
  date
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
    return transformVote(json);
  };

  export const getBallots = async ({session, number}) => {
    const response = await fetch(
      `https://knowyouronions.albertjvm.ca/.netlify/functions/cors?url=${URL}/votes/ballots?vote=/votes/${session}/${number}&limit=500`, {
        headers: DEFAULT_HEADERS
      }
    );
    const json = await response.json();
    return json.objects.map(({ballot, politician_url}) => ({
      ballot,
      politician_url
    }));
  };

  export const getBill = async billUrl => {
    const response = await fetch(`${URL}${billUrl}`, {
      headers: DEFAULT_HEADERS
    });
    const json = await response.json();
    return json;
  };

