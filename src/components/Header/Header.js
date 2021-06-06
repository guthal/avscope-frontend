import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  ClickAwayListener,
} from "@material-ui/core";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import { APP_ROUTES, HEADER_LABELS } from "../../configs/app";
import Banner from "../../assets/avscopeBanner.png";
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
    userWatchlistData,
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

  const handleCreatorProfileClick = () => {
    history.push(APP_ROUTES.CREATOR_PROFILE.path);
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

  const handleHistoryClick = () => {
    history.push(`${APP_ROUTES.HISTORY_PAGE.path}/${userId}`);
  };

  const handleTicketsClick = () => {
    history.push(`${APP_ROUTES.TICKETS_PAGE.path}/${userId}`);
  };

  const handleWatchListPage = () => {
    history.push(`${APP_ROUTES.WATCHLIST_PAGE.path}/${userId}`);
  };

  const handleHomeClick = () => {
    history.push(`${APP_ROUTES.HOME_PAGE.path}`);
  };

  const handleContentTypeClick = contentType =>
    history.push(`${APP_ROUTES.SPECIFIC_CONTENT_DISPLAY.path}/${contentType}`);

  const handleSearchClick = searchString =>
    history.push({
      pathname: `${APP_ROUTES.SPECIFIC_CONTENT_DISPLAY.path}/all`,
      state: { search: searchString },
    });

  useEffect(() => {
    if (logoutData) {
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
      <PageError message="Oops.. Something went wrong while fetching contents." />
    );

  return (
    <Box mb={2}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.logoLinkContainer}>
            <Box className={classes.title}>
              <img
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
                src={Banner}
                alt="logo"
              />
            </Box>
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
            <Box onClick={handleHomeClick} mt={1}>
              <HomeTwoToneIcon className={classes.iconTrigger} />
            </Box>
          )}
          {isUserLoggedIn && (
            <Box px={2}>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <Box className={classes.profileContainer} mt={1}>
                  <Box onClick={handleToggleMenu}>
                    <FaceTwoToneIcon className={classes.iconTrigger} />
                  </Box>
                  {openProfile && (
                    <Box
                      className={classes.profileMenu}
                      onClick={handleCloseMenu}
                    >
                      {utype === 0 && (
                        <Button
                          color="secondary"
                          variant="outlined"
                          className={classes.profileMenuItem}
                          onClick={handleAdminClick}
                          disableElevation
                        >
                          {HEADER_LABELS.ADMIN}
                        </Button>
                      )}
                      {utype < 2 && (
                        <Button
                          color="secondary"
                          variant="outlined"
                          className={classes.profileMenuItem}
                          onClick={handleCreatorProfileClick}
                          disableElevation
                        >
                          {HEADER_LABELS.PROFILE}
                        </Button>
                      )}
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={handleWatchListPage}
                        disableElevation
                      >
                        <Badge
                          badgeContent={userWatchlistData.length}
                          color="secondary"
                        >
                          <Typography>WATCHLIST</Typography>
                        </Badge>
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={() => handleSearchClick("ugram")}
                        disableElevation
                      >
                        <Typography>SEARCH</Typography>
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={handleHistoryClick}
                        disableElevation
                      >
                        <Typography>HISTORY</Typography>
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.profileMenuItem}
                        onClick={handleTicketsClick}
                        disableElevation
                      >
                        <Typography>TICKETS</Typography>
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.profileMenuItem}
                        onClick={handleLogoutClick}
                        disableElevation
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
      {isUserLoggedIn && (
        <AppBar position="static" style={{ borderTop: "1px solid white" }}>
          <Toolbar>
            <Box className={classes.contentTypeLinksContainer}>
              <Box px={2} onClick={() => handleContentTypeClick("all")}>
                <Typography className={classes.contentTypeLink}>
                  All Contents
                </Typography>
              </Box>
              <Box px={2} onClick={() => handleContentTypeClick("br")}>
                <Typography className={classes.contentTypeLink}>
                  Buy/Rent
                </Typography>
              </Box>
              <Box px={2} onClick={() => handleContentTypeClick("week")}>
                <Typography className={classes.contentTypeLink}>
                  Weekly
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}

export default Header;
