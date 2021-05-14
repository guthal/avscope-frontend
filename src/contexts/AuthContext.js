import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isUserLoggedIn: false,
  userId: "",
  username: "ak@gmail.com",
  utype: 2,
  setUsername: () => {},
  setUserId: () => {},
  setIsLoggedIn: () => {},
  setUtype: () => {},
});

function AuthContextProvider({ children }) {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [utype, setUtype] = useState(2);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userId,
        username,
        utype,
        setUsername,
        setUserLoggedIn,
        setUserId,
        setUtype,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
