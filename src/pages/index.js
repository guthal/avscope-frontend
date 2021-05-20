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
import VideoDetailPage from "./VideoDetailPage";
import CreatorsPage from "./CreatorsPage";
import AdminPage from "./AdminPage";
import ContentUploadPage from "./ContentUploadPage";
import AddCreatorPage from "./AddCreatorPage";
import AdminRoute from "../components/routeComponents/AdminRoute";
import PrivateRoute from "../components/routeComponents/PrivateRoute";

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

        <PrivateRoute
          exact
          path={`${APP_ROUTES.HISTORY_PAGE.path}/:userID`}
          component={HistoryPage}
        />

        <PrivateRoute
          exact
          path={`${APP_ROUTES.TICKETS_PAGE.path}/:userID`}
          component={TicketsPage}
        />

        <AdminRoute
          exact
          path={APP_ROUTES.CREATORS_PAGE.path}
          component={CreatorsPage}
        />
        <AdminRoute
          exact
          path={APP_ROUTES.ADMIN_DASHBOARD.path}
          component={AdminPage}
        />
        <AdminRoute
          path={`${APP_ROUTES.CONTENT_UPLOAD.path}/:userID`}
          component={ContentUploadPage}
        />
        <AdminRoute
          path={`${APP_ROUTES.ADD_CREATOR_PAGE.path}`}
          component={AddCreatorPage}
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
