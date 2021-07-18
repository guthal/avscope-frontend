import React, { createContext, useState, useEffect, useMemo } from "react";
import { getVerifyUser } from "../utils/api";
import { transformGetVerifyUser } from "../utils/api-transforms";
import useGetApi from "../hooks/useGetApi";
import PageLoader from "../components/PageLoader";

const AuthContext = createContext({
  isUserLoggedIn: false,
  isUserEmailVerified: false,
  userId: "",
  userAge: -1,
  username: "",
  utype: 2,
  name: "",
  userWatchlistData: [],
  setUsername: () => {},
  setUserId: () => {},
  setUserAge: () => {},
  setIsUserLoggedIn: () => {},
  setIsUserEmailVerified: () => {},
  setUtype: () => {},
  setName: () => {},
  setUserWatchlistData: () => {},
});

function AuthContextProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);
  const [userAge, setUserAge] = useState(-1);
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
      setIsUserEmailVerified(verifyUserData.userVerified);
      setUserId(verifyUserData.userId);
      setUserAge(verifyUserData.userAge);
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
      setUserAge(-1);
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
        isUserEmailVerified,
        userId,
        userAge,
        username,
        utype,
        name,
        userWatchlistData,
        setUsername,
        setIsUserLoggedIn,
        setIsUserEmailVerified,
        setUserId,
        setUserAge,
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
