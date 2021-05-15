import React, { useContext, useEffect, useMemo } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { APP_ROUTES, HEADER_LABELS } from "../../configs/app";
import useStyles from "./Header.Styles";
import { useHistory } from "react-router";
import useGetApi from "../../hooks/useGetApi";
import { getLogoutUser } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const {
    isUserLoggedIn,
    utype,
    setUsername,
    setUserLoggedIn,
    setUserId,
    setUtype,
  } = useContext(AuthContext);

  const getLogoutParams = useMemo(() => [], []);

  const {
    data: logoutData,
    loading: logoutLoading,
    error: logoutError,
    triggerApi: logoutTriggerGetApi,
  } = useGetApi(getLogoutUser, getLogoutParams, undefined);

  const handleLogoClick = () => {
    history.push(APP_ROUTES.HOME_PAGE.path);
  };

  const handleAdminClick = () => {
    history.push(APP_ROUTES.ADMIN_DASHBOARD.path);
  };

  const handleLoginClick = () => {
    history.push(APP_ROUTES.LOGIN_PAGE.path);
  };

  const handleLogoutClick = () => {
    logoutTriggerGetApi();
  };

  const handleCheckoutClick = () => {
    history.push(APP_ROUTES.CHECKOUT_PAGE.path);
  };

  useEffect(() => {
    setUsername("");
    setUserLoggedIn("");
    setUserId("");
    setUtype("");
    history.push(APP_ROUTES.LOGIN_PAGE.path);
  }, [logoutData, setUserId, setUserLoggedIn, setUsername, setUtype, history]);

  if (logoutLoading) return <PageLoader />;

  if (logoutError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Box mb={2}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="span"
            onClick={handleLogoClick}
            className={classes.logoContainer}
          >
            <Typography variant="h4" className={classes.title}>
              {HEADER_LABELS.LOGO}
            </Typography>
          </Box>
          {utype === 0 && isUserLoggedIn && (
            <Box mx={2}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleAdminClick}
              >
                {HEADER_LABELS.ADMIN}
              </Button>
            </Box>
          )}
          {!isUserLoggedIn ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLoginClick}
            >
              {HEADER_LABELS.LOGIN}
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogoutClick}
            >
              {HEADER_LABELS.LOGOUT}
            </Button>
          )}
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleCheckoutClick}
          >
            Checkout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
