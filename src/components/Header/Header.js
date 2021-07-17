import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  InputBase,
  ClickAwayListener,
  Hidden,
  Modal,
} from "@material-ui/core";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import VideoLibraryRoundedIcon from "@material-ui/icons/VideoLibraryRounded";
import LockIcon from "@material-ui/icons/Lock";
import AVClubLogo from "../../assets/logo.svg";
import MobileAVLogo from "../../assets/logo.png";
import { APP_ROUTES, HEADER_LABELS } from "../../configs/app";
import Banner from "../../assets/avscopeBanner.png";
import useStyles from "./Header.Styles";
import { useHistory, useLocation } from "react-router";
import useGetApi from "../../hooks/useGetApi";
import { getLogoutUser } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";
import PageError from "../../components/PageError";
import { getQueryVariable } from "../../utils/generic";

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

  const { search: searchQuery } = useLocation();
  const searchString = getQueryVariable(searchQuery.slice(1), "search");

  const [searchValue, setSearchValue] = useState(searchString);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const getLogoutParams = useMemo(() => [], []);

  const {
    data: logoutData,
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
    setOpenProfile((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setOpenProfile(false);
  };

  const handleSearchModalOpen = () => {
    setSearchModalOpen(true);
  };

  const handleSearchModalClose = () => {
    setSearchModalOpen(false);
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

  const handleContentTypeClick = (contentType) =>
    history.push(`${APP_ROUTES.SPECIFIC_CONTENT_DISPLAY.path}/${contentType}`);

  const handleSetSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    handleSearchModalClose();
    history.push(
      `${APP_ROUTES.SPECIFIC_CONTENT_DISPLAY.path}/all?search=${
        searchValue || ""
      }`
    );
  };

  useEffect(() => {
    if (logoutData) {
      setUsername("");
      setUserId("");
      setUtype("");
      setIsUserLoggedIn(false);
      window.location.href = "/login";
    }
  }, [logoutData, setUserId, setIsUserLoggedIn, setUsername, setUtype]);

  if (logoutError)
    return (
      <PageError message="Oops.. Something went wrong while fetching contents." />
    );

  return (
    <Box mb={2}>
      <AppBar position="sticky" className={classes.appNavBar}>
        <Toolbar>
          <Fragment>
            <Hidden smDown>
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
            </Hidden>
            <Hidden mdUp>
              <Box className={classes.logoLinkContainer}>
                <Box className={classes.mobileTitle}>
                  <img
                    onClick={handleLogoClick}
                    src={MobileAVLogo}
                    alt="logo"
                  />
                </Box>
              </Box>
            </Hidden>
          </Fragment>
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
            <Fragment>
              <Hidden mdUp>
                <Box mt={1}>
                  <Box px={2}>
                    <img
                      src={AVClubLogo}
                      alt="AVClub-Logo"
                      className={classes.iconTriggerDisabled}
                    />
                  </Box>
                </Box>
              </Hidden>
              <Hidden smDown>
                <Box px={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disableTouchRipple
                  >
                    <LockIcon className={classes.clubLocked} /> AVClub
                  </Button>
                </Box>
              </Hidden>
            </Fragment>
          )}
          {isUserLoggedIn && (
            <Fragment>
              <Hidden mdUp>
                <Box mt={1}>
                  <Box onClick={() => handleContentTypeClick("all")}>
                    <VideoLibraryRoundedIcon className={classes.iconTrigger} />
                  </Box>
                </Box>
              </Hidden>
              <Hidden smDown>
                <Box>
                  <Box onClick={() => handleContentTypeClick("all")}>
                    <Typography className={classes.contentTypeLink}>
                      All Contents
                    </Typography>
                  </Box>
                </Box>
              </Hidden>
            </Fragment>
          )}
          {isUserLoggedIn && (
            <Fragment>
              <Hidden mdUp>
                <Box px={2}>
                  <Box mt={1}>
                    <SearchIcon
                      onClick={handleSearchModalOpen}
                      className={classes.iconTrigger}
                    />
                  </Box>
                  <Modal
                    className={classes.modal}
                    open={searchModalOpen}
                    onClose={handleSearchModalClose}
                  >
                    <Box className={classes.paper}>
                      <Box className={classes.searchModalIcon}>
                        <SearchIcon />
                      </Box>
                      <InputBase
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputModalInput,
                        }}
                        name="search"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSetSearchValue}
                        inputProps={{ "aria-label": "search" }}
                      />
                      <Box style={{ marginTop: "3px" }}>
                        <Button
                          variant="outlined"
                          onClick={handleSearchClick}
                          color="secondary"
                        >
                          Search
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Hidden>
              <Hidden smDown>
                <form onSubmit={handleSearchClick}>
                  <Box px={2}>
                    <Box className={classes.search}>
                      <Box className={classes.searchIcon}>
                        <SearchIcon />
                      </Box>
                      <InputBase
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        name="search"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSetSearchValue}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Box>
                  </Box>
                </form>
              </Hidden>
            </Fragment>
          )}
          {isUserLoggedIn && (
            <Box onClick={handleHomeClick} mt={1}>
              <HomeTwoToneIcon className={classes.iconTrigger} />
            </Box>
          )}
          {isUserLoggedIn && (
            <Box pl={2}>
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
                          <Typography>{HEADER_LABELS.ADMIN}</Typography>
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
                          <Typography>{HEADER_LABELS.PROFILE}</Typography>
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
                          badgeContent={userWatchlistData?.length}
                          color="secondary"
                        >
                          <Typography>WATCHLIST</Typography>
                        </Badge>
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
      {/* {["/", "/sp-content/all", "/sp-content/br", "/sp-content/week"].includes(
        pathname
      ) && (
        <AppBar position="static" style={{ borderTop: "1px solid white" }}>
          <Toolbar>
            <Box pr={2} className={classes.dflex}>
              <Box className={classes.contentTypeLinksContainer}>
                <Box pr={2} onClick={() => handleContentTypeClick("all")}>
                  <Typography className={classes.contentTypeLink}>
                    All Contents
                  </Typography>
                </Box>
                <Box pr={2} onClick={() => handleContentTypeClick("br")}>
                  <Typography className={classes.contentTypeLink}>
                    Buy/Rent
                  </Typography>
                </Box>
                <Box pr={2} onClick={() => handleContentTypeClick("week")}>
                  <Typography className={classes.contentTypeLink}>
                    Weekly
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      )} */}
    </Box>
  );
}

export default Header;
