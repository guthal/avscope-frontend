import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isUserLoggedIn: false,
  userId: "",
  username: "ak@gmail.com",
  setUsername: () => {},
  setUserId: () => {},
  setIsLoggedIn: () => {},
});

function AuthContextProvider({ children }) {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        userId,
        username,
        setUsername,
        setUserLoggedIn,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
