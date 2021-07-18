import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { APP_ROUTES } from "../../../configs/app";
import AuthContext from "../../../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={`${APP_ROUTES.LOGIN_PAGE.path}`} />
        )
      }
    />
  );
}

export default PrivateRoute;
