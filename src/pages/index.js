import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components";
import { APP_ROUTES } from "../configs/app";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import TicketsPage from "./TicketsPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import PageNotFound from "./PageNotFound";
import ContentPage from "./ContentPage";

function Pages() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={APP_ROUTES.HOME_PAGE.path} component={HomePage} />

        <Route
          exact
          path={`${APP_ROUTES.CONTENT_PAGE.path}/:contentID`}
          component={ContentPage}
        />
        <Route
          exact
          path={`${APP_ROUTES.HISTORY_PAGE.path}/:userID`}
          component={HistoryPage}
        />
        <Route
          exact
          path={`${APP_ROUTES.TICKETS_PAGE.path}/:userID`}
          component={TicketsPage}
        />
        <Route
          exact
          path={`${APP_ROUTES.LOGIN_PAGE.path}`}
          component={LoginPage}
        />
        <Route
          exact
          path={`${APP_ROUTES.SIGNUP_PAGE.path}`}
          component={SignupPage}
        />
        <Route path="/*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default Pages;
