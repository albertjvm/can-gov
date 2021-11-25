import { useInfiniteQuery, useQuery } from "react-query";
import { DEFAULT_QUERY_OPTIONS, URL, NO_CORS, DEFAULT_HEADERS } from "../config";

const getSpeeches = async ({mpId}) => {
    const response = await fetch(`${URL}/speeches/?politician=${mpId}`, {
        headers: DEFAULT_HEADERS
    });

    const json = await response.json();
    
    return json.objects.map(({h1, h2, content, time, source_id}) => ({
        title: h1?.en,
        subtitle: h2?.en,
        content: content?.en.replace(/<.*?>/g, ""),
        time,
        source_id,
        date: time.split(' ')[0]
    }));
};

const getSpeechesForDate = async ({ date, pageParam = 0 }) => {
    let response = await fetch(
        `${NO_CORS}${URL}/speeches/?limit=500&offset=${pageParam * 500}${!date ? '' : `&time__range=${date}+00%3A00%2C${date}+23%3A59`}`,
        {
            headers: DEFAULT_HEADERS
        }
    );

    const { pagination, objects } = await response.json();
    return {
        pagination,
        objects: objects
        .sort((a, b) => {
            let aId = parseInt(a.source_id);
            let bId = parseInt(b.source_id);

            if (isNaN(aId) || isNaN(bId)) {
                return (new Date(a.time)).getTime() - (new Date(b.time)).getTime()
            } else {
                return parseInt(a.source_id) - parseInt(b.source_id);
            }
        })
        .map(({attribution, h1, h2, content, politician_url, ...rest}) => ({
            ...rest,
            attribution: attribution.en,
            mp: politician_url?.split('/')[2],
            content: content?.en.replace(/<.*?>/g, ""),
            title: h1?.en,
            subtitle: h2?.en
        }))
    };
};

export function useSpeeches({mpId}) {
    return useQuery(["speeches", mpId], () => getSpeeches({mpId}), {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: !!mpId
    })
};

export function useSpeechesForDate({ date }) {
    return useInfiniteQuery(["speeches", date], () => getSpeechesForDate({ date }), {
        ...DEFAULT_QUERY_OPTIONS,
        // enabled: !!date,
        getNextPageParam: ({ limit, offset, next_url }) => {
            if (next_url !== null) {
                return offset/limit + 1;
            }
        },
        getPreviousPageParam: ({limit, offset, previous_url}) => {
            if (previous_url !== null) {
                return offset/limit - 1;
            }
        }
    });
};
