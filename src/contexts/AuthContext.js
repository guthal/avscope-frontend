import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isUserLoggedIn: false,
  userId: "",
  username: "",
  utype: 2,
  name: "",
  setUsername: () => {},
  setUserId: () => {},
  setIsUserLoggedIn: () => {},
  setUtype: () => {},
});

function AuthContextProvider({ children }) {
  /**
   * API call to backend with the cookie
   *      -> if no cookie then default
   * GET user info from API and
   *      -> then set all these state vars
   */

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [utype, setUtype] = useState(2);
  const [name, setName] = useState();

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userId,
        username,
        utype,
        name,
        setUsername,
        setIsUserLoggedIn,
        setUserId,
        setUtype,
        setName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
