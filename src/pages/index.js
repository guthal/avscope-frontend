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
import WatchListPage from "./WatchListPage";
import AdminRoute from "../components/routeComponents/AdminRoute";
import CreatorRoute from "../components/routeComponents/CreatorRoute";
import PrivateRoute from "../components/routeComponents/PrivateRoute";
import CreatorProfile from "./CreatorProfile";
import PayoutPage from "./PayoutPage";
import ManageContentPage from "./ManageContentPage";

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

        <PrivateRoute
          exact
          path={`${APP_ROUTES.WATCHLIST_PAGE.path}/:userID`}
          component={WatchListPage}
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

        <AdminRoute
          path={`${APP_ROUTES.MANAGE_CONTENT_PAGE.path}`}
          component={ManageContentPage}
        />

        <CreatorRoute
          path={`${APP_ROUTES.CREATOR_PROFILE.path}`}
          component={CreatorProfile}
        />

        <AdminRoute
          path={`${APP_ROUTES.CREATOR_PAYOUT.path}/:creatorID`}
          component={PayoutPage}
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
