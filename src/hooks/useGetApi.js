import { useCallback, useEffect, useState, useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

function useGetApi(
  apiCallback,
  apiCallbackParams = undefined,
  apiTransformFn = undefined
) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [toggle, setToggle] = useState(false);

  const { setPageLoading } = useContext(AppStateContext);

  const triggerApi = useCallback(() => setToggle(true), []);

  useEffect(() => {
    setData(undefined);
  }, [apiCallbackParams]);

  useEffect(() => {
    if (data) setError(undefined);
  }, [data]);

  useEffect(() => {
    if (error) setData(undefined);
  }, [error]);

  useEffect(() => {
    if (!loading) setToggle(false);
    setPageLoading(loading);
  }, [loading, setPageLoading]);

  useEffect(() => {
    if (toggle) {
      setLoading(true);

      apiCallback
        .apply(null, apiCallbackParams)
        .then(resData => {
          setData(apiTransformFn?.(resData) || resData);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [toggle, apiCallback, apiCallbackParams, apiTransformFn]);

  return { data, loading, error, triggerApi };
}

export default useGetApi;
