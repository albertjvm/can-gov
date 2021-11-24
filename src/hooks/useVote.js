import { useQuery } from 'react-query';
import { DEFAULT_QUERY_OPTIONS, URL, NO_CORS, DEFAULT_HEADERS } from '../config';

const getVote = async (number, session) => {
    const response = await fetch(
        `${NO_CORS}${URL}/votes/${session}/${number}`, {
            headers: DEFAULT_HEADERS
        }
    );

    const {
        description, 
        nay_total, 
        yea_total, 
        paired_total,
        party_votes,
        result,
        date
    } = await response.json();

    return ({
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
};

export function useVote({ number, session }) {
    return useQuery(["vote", number, session], () => getVote(number, session), {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: !!number && !!session
    });
};
