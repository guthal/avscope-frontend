import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { APP_ROUTES } from "../../../configs/app";
import AuthContext from "../../../contexts/AuthContext";

function CreatorRoute({ component: Component, ...rest }) {
  const { isUserLoggedIn, utype } = useContext(AuthContext);

  const getRoute = (props) => {
    if (isUserLoggedIn) {
      if (utype <= 2) {
        return <Component {...props} />;
      } else {
        return <Redirect to={`${APP_ROUTES.HOME_PAGE.path}`} />;
      }
    } else {
      return <Redirect to={`${APP_ROUTES.LOGIN_PAGE.path}`} />;
    }
  };

  return <Route {...rest} render={(props) => getRoute(props)} />;
}

export default CreatorRoute;
