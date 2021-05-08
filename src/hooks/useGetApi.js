import { useCallback, useEffect, useState } from "react";

function useGetApi(
  apiCallback,
  apiCallbackParams = undefined,
  apiTransformFn = undefined
) {
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
        .apply(null, apiCallbackParams)
        .then((data) => {
          setData(apiTransformFn?.(data) || data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
          setToggle(false);
        });
    }
  }, [toggle, apiCallback, apiCallbackParams, apiTransformFn]);

  return { data, loading, error, triggerApi };
}

export default useGetApi;
