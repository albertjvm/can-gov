import { useQuery } from 'react-query';
import { DEFAULT_QUERY_OPTIONS, URL, NO_CORS, DEFAULT_HEADERS } from '../config';

const getMP = async (id) => {
    const response = await fetch(
        `${NO_CORS}${URL}/politicians/${id}`, {
            headers: DEFAULT_HEADERS
        }
    );
    const {url, memberships, ...rest} = await response.json();
    return ({
        ...rest,
        memberships,
        party: memberships[0]?.party?.short_name?.en,
        id: url.split('/')[2]
    });
};

export function useMP(id) {
    return useQuery(["mp", id], () => getMP(id), {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: !!id
    });
};
