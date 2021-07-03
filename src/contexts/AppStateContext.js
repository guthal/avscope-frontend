import React, { createContext, useState } from "react";

const AppStateContext = createContext({
  pageLoading: false,
  setPageLoading: () => {},
});

function AppStateContextProvider({ children }) {
  const [pageLoading, setPageLoading] = useState(false);

  return (
    <AppStateContext.Provider
      value={{
        pageLoading,
        setPageLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateContext;
export { AppStateContextProvider };
