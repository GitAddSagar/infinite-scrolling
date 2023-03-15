import { useEffect, useState } from "react";
import axios from "axios";

type Canceler = (message?: string) => void;

const useSearch = (query: string, page: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    let cancel: Canceler;
    setError(false);
    setLoading(true);
    axios({
      method: "GET",
      url: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-users?limit=10&page=${page}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res)
        setBooks([...books, ...res.data.data]);
        setHasMore(res.data.data.length > 0);
        setLoading(false);
        
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        console.log(err)
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [query, page]);

  return { loading, error, hasMore, books };
};

export default useSearch;
