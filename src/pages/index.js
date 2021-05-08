import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import { APP_ROUTES } from "../configs/app";

function Pages() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route
                    exact
                    path={APP_ROUTES.HOME_PAGE.path}
                    component={HomePage}
                />
                {/* <Route exact path={`${APP_ROUTES.CONTENT_PAGE.path}/:contentId`} /> */}
                {/* <Route exact path={`${APP_ROUTES.HISTORY_PAGE.path}/:userId`} /> */}
                {/* <Route exact path={`${APP_ROUTES.TICKETS_PAGE.path}/:userId`} /> */}
                <Route path="/*" component={PageNotFound} />
            </Switch>
        </Router>
    );
}

export default Pages;
