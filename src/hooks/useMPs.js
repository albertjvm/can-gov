import { useQuery } from 'react-query';
import { DEFAULT_QUERY_OPTIONS, URL, DEFAULT_HEADERS } from '../config';

const getPoliticians = async () => {
    const response = await fetch (
        `${URL}/politicians/`,
        {
            headers: DEFAULT_HEADERS
        }
    );
    
    const json = await response.json();

    return json.objects.map(({ name, url, image, current_party, current_riding}) => ({
        name,
        url,
        id: url.split("/")[2],
        image,
        party: current_party?.short_name?.en,
        riding: current_riding?.name?.en,
        province: current_riding?.province
      }));
};

export function useMPs() {
    return useQuery("mps", getPoliticians, DEFAULT_QUERY_OPTIONS);
};
