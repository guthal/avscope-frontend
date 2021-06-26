import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { APP_ROUTES } from "../../../configs/app";
import AuthContext from "../../../contexts/AuthContext";
import { useHistory } from "react-router";

function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory();

  const { isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isUserLoggedIn) {
      history.push(APP_ROUTES.LOGIN_PAGE.path);
    }
  }, [history, isUserLoggedIn]);

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
