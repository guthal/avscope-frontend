import React, { createContext, useState, useEffect, useMemo } from "react";
import { getVerifyUser } from "../utils/api";
import { transformGetVerifyUser } from "../utils/api-transforms";
import useGetApi from "../hooks/useGetApi";
import PageLoader from "../components/PageLoader";

const AuthContext = createContext({
  isUserLoggedIn: false,
  userId: "",
  username: "",
  utype: 2,
  name: "",
  userWatchlistData: [],
  setUsername: () => {},
  setUserId: () => {},
  setIsUserLoggedIn: () => {},
  setUtype: () => {},
  setName: () => {},
  setUserWatchlistData: () => {},
});

function AuthContextProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [utype, setUtype] = useState(2);
  const [name, setName] = useState();
  const [userWatchlistData, setUserWatchlistData] = useState([]);
  /**
   * API call to backend with the cookie
   *      -> if no cookie then default
   * GET user info from API and
   *      -> then set all these state vars
   */
  const getVerifyUserParams = useMemo(() => [], []);

  const {
    data: verifyUserData,
    loading: verifyLoading,
    error: verifyError,
    triggerApi: verifyTriggerApi,
  } = useGetApi(getVerifyUser, getVerifyUserParams, transformGetVerifyUser);

  useEffect(() => verifyTriggerApi(), [verifyTriggerApi]);

  useEffect(() => {
    if (verifyUserData) {
      setUsername(verifyUserData.username);
      setIsUserLoggedIn(true);
      setUserId(verifyUserData.userId);
      setUtype(verifyUserData.utype);
      setName(verifyUserData.name);
      setUserWatchlistData(verifyUserData.userWatchlist);
    }
  }, [setUserWatchlistData, verifyUserData]);

  useEffect(() => {
    if (verifyError) {
      setUsername("");
      setIsUserLoggedIn(false);
      setUserId("");
      setUtype(2);
      setName("");
      setUserWatchlistData([]);
    }
  }, [verifyError]);

  if (verifyLoading) return <PageLoader />;

  if (!verifyError && !verifyUserData) return <></>;

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userId,
        username,
        utype,
        name,
        userWatchlistData,
        setUsername,
        setIsUserLoggedIn,
        setUserId,
        setUtype,
        setName,
        setUserWatchlistData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
