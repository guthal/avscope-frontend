import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  ClickAwayListener,
  Avatar,
} from "@material-ui/core";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
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
    userId,
    utype,
    setUsername,
    setIsUserLoggedIn,
    setUserId,
    setUtype,
  } = useContext(AuthContext);
  const [openProfile, setOpenProfile] = useState(false);

  // Done to set logoutData to undefined through getLogoutParams
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLogoutParams = useMemo(() => [], [isUserLoggedIn]);

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

  const handleToggleMenu = () => {
    setOpenProfile(prev => !prev);
  };

  const handleCloseMenu = () => {
    setOpenProfile(false);
  };

  const handleCheckoutClick = () => {
    history.push(APP_ROUTES.CHECKOUT_PAGE.path);
  };

  const handleHistoryClick = () => {
    history.push(`${APP_ROUTES.HISTORY_PAGE.path}/${userId}`);
  };

  const handleTicketsClick = () => {
    history.push(`${APP_ROUTES.TICKETS_PAGE.path}/${userId}`);
  };

  useEffect(() => {
    if (logoutData) {
      handleCloseMenu();
      setUsername("");
      setIsUserLoggedIn(false);
      setUserId("");
      setUtype("");
    }
  }, [logoutData, setUserId, setIsUserLoggedIn, setUsername, setUtype]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      history.push(APP_ROUTES.LOGIN_PAGE.path);
    }
  }, [isUserLoggedIn, history]);

  if (logoutLoading) return <PageLoader />;

  if (logoutError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Box mb={2}>
      <AppBar position="static">
        <Toolbar>
          <Box component="span" className={classes.logoContainer}>
            <Typography
              variant="h4"
              onClick={handleLogoClick}
              className={classes.title}
            >
              {HEADER_LABELS.LOGO}
            </Typography>
          </Box>
          {!isUserLoggedIn && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLoginClick}
            >
              {HEADER_LABELS.LOGIN}
            </Button>
          )}
          {isUserLoggedIn && (
            <Box px={2}>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <Box className={classes.profileContainer}>
                  <Avatar onClick={handleToggleMenu}>
                    <FaceTwoToneIcon />
                  </Avatar>
                  {openProfile && (
                    <Box className={classes.profileMenu}>
                      {utype === 0 && (
                        <Box mx={2}>
                          <Button
                            color="secondary"
                            variant="outlined"
                            className={classes.profileMenuItem}
                            onClick={handleAdminClick}
                          >
                            {HEADER_LABELS.ADMIN}
                          </Button>
                        </Box>
                      )}
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={handleCheckoutClick}
                      >
                        <Typography>CHECKOUT</Typography>
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={handleHistoryClick}
                      >
                        <Typography>HISTORY</Typography>
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={handleTicketsClick}
                      >
                        <Typography>TICKETS</Typography>
                      </Button>

                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.profileMenuItem}
                        onClick={handleLogoutClick}
                      >
                        {HEADER_LABELS.LOGOUT}
                      </Button>
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
