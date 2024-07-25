import { useEffect, useState } from "react";

export function useFetch(resultItem, initalData, resetUseEffect) {
  const [data, setData] = useState(initalData);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    const abortController = new AbortController();

    (async () => {
      const result = await resultItem;

      setData(result);
      setIsFetching(false);
    })();

    return () => abortController.abort();
  }, [resetUseEffect]);

  return {
    data,
    setData,
    isFetching,
  };
}
