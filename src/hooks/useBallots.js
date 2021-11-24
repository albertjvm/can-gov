import { useQuery } from "react-query";
import { DEFAULT_QUERY_OPTIONS, URL, NO_CORS, DEFAULT_HEADERS } from "../config";

const getBallots = async (number, session) => {
    const response = await fetch(
        `${NO_CORS}${URL}/votes/${session}/${number}&limit=500`, {
            headers: DEFAULT_HEADERS
        }
    );
    const json = await response.json();
    return json.objects.map(({ballot, politician_url}) => ({
        ballot,
        politician_url
    }));
};

export function useBallots({number, session}) {
    return useQuery(["ballots", number, session], () => getBallots(number, session), {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: !!number && !!session
    });
}