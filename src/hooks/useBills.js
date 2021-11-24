import { useQuery } from "react-query";
import { DEFAULT_QUERY_OPTIONS, URL, DEFAULT_HEADERS } from "../config";

const getBills = async ({session, mpId}) => {
    const response = await fetch(
        `${URL}/bills/?${!!session ? `session=${session}` : ''}${!!mpId ? `sponsor_politician=${mpId}` : ''}`, 
        {
            headers: DEFAULT_HEADERS
        }
    );

    const json = await response.json();

    return json.objects.map(({name, ...rest}) => ({
        ...rest,
        name: name.en
    }));
};

export function useBills({session = null, mpId = null}) {
    return useQuery(
        ["bills", session, mpId], 
        () => getBills({session, mpId}), 
        {
            ...DEFAULT_QUERY_OPTIONS,
            enabled: !!session || !!mpId
        }
    )
};