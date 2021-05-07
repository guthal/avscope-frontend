import { useCallback, useEffect, useState } from "react";

function useGetContents(apiCallback) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [toggle, setToggle] = useState(false);

  const triggerApi = useCallback(() => setToggle(true), []);

  useEffect(() => {
    if (data) setError(undefined);
  }, [data]);

  useEffect(() => {
    if (error) setData(undefined);
  }, [error]);

  useEffect(() => {
    if (toggle) {
      setLoading(true);

      apiCallback
        .then((data) => {
          setData(data);
        })
        .catch((err) => setError(err))
        .finally(() => {
          // setLoading(false);
          setToggle(false);
        });
    }
  }, [toggle, apiCallback]);

  return { data, loading, error, triggerApi };
}

export default useGetContents;
