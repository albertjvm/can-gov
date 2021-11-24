import { useQuery } from "react-query";
import { DEFAULT_QUERY_OPTIONS, URL, NO_CORS, DEFAULT_HEADERS } from "../config";

const getBill = async (number, session) => {
    const response = await fetch(`${NO_CORS}${URL}/bills/${session}/${number}`, {
      headers: DEFAULT_HEADERS
    });

    const {
      name, 
      short_title,
      status,
      sponsor_politician_url,
      ...rest
    } = await response.json();
    
    return ({
      ...rest,
      name: name.en,
      short_title: short_title.en,
      status: status.en,
      sponsor_id: sponsor_politician_url?.split('/')[2]
    });
  };

export function useBill({number, session}) {
    return useQuery(["bill", number, session], () => getBill(number, session), {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: !!number && !!session
    });
};