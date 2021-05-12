import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components";
import HomePage from "./HomePage";
import HistoryPage from "./HistoryPage";
import TicketsPage from "./TicketsPage";
import PageNotFound from "./PageNotFound";
import { APP_ROUTES } from "../configs/app";
import VideoDetailPage from "./VideoDetailPage";
import CreatorsPage from "./CreatorsPage";
import AdminPage from "./AdminPage";
import ContentUploadPage from "./ContentUploadPage/ContentUploadPage";

function Pages() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={APP_ROUTES.HOME_PAGE.path} component={HomePage} />

        <Route
          exact
          path={`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/:contentID`}
          component={VideoDetailPage}
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
          path={APP_ROUTES.CREATORS_PAGE.path}
          component={CreatorsPage}
        />
        <Route
          exact
          path={APP_ROUTES.ADMIN_DASHBOARD.path}
          component={AdminPage}
        />
        <Route
          path={`${APP_ROUTES.CONTENT_UPLOAD.path}/:userID`}
          component={ContentUploadPage}
        />

        <Route path="/*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default Pages;
