import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import TicketsPage from "./TicketsPage";
import PageNotFound from "./PageNotFound";
import { APP_ROUTES } from "../configs/app";
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
        <Route path="/*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default Pages;
