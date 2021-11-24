import { useQuery } from 'react-query';
import { DEFAULT_QUERY_OPTIONS, URL, DEFAULT_HEADERS } from '../config';

const getVotes = async () => {
    const response = await fetch (
        `${URL}/votes/?limit=500&offset=0`,
        {
            headers: DEFAULT_HEADERS
        }
    );
    const json = await response.json();
    return json.objects;
};

export function useVotes() {
    return useQuery("votes", getVotes, DEFAULT_QUERY_OPTIONS);
};
