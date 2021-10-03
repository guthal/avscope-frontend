import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../../configs/app";
import AuthContext from "../../../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props =>
        isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${APP_ROUTES.LOGIN_PAGE.path}`,
              state: { preLoginPath: location.pathname },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
