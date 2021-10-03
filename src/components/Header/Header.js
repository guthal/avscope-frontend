import React, { Fragment, useContext, useState } from "react";
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
import AuthContext from "../../contexts/AuthContext";
import { getQueryVariable } from "../../utils/generic";
import UserProfileModal from "../UserProfileModal";

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const { isUserLoggedIn, userId, utype, userWatchlistData } =
    useContext(AuthContext);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUserAccountModal, setOpenUserAccountModal] = useState(false);

  const { search: searchQuery } = useLocation();
  const searchString = getQueryVariable(searchQuery.slice(1), "search");

  const [searchValue, setSearchValue] = useState(searchString);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleLogoClick = () => {
    history.push(APP_ROUTES.HOME_PAGE.path);
  };

  const handleAdminClick = () => {
    history.push(APP_ROUTES.ADMIN_DASHBOARD.path);
  };

  const handleOpenUserAccountModal = () => {
    setOpenUserAccountModal(true);
  };

  const handleCreatorProfileClick = () => {
    history.push(APP_ROUTES.CREATOR_PROFILE.path);
  };

  const handleLoginClick = () => {
    history.push({
      pathname: APP_ROUTES.LOGIN_PAGE.path,
      state: { preLoginPath: APP_ROUTES.HOME_PAGE.path },
    });
  };

  const handleToggleMenu = () => {
    setOpenProfile(prev => !prev);
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
    setOpenUserAccountModal(false);
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

  const handleSetSearchValue = event => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = event => {
    event.preventDefault();
    handleSearchModalClose();
    history.push(
      `${APP_ROUTES.SPECIFIC_CONTENT_DISPLAY.path}/all?search=${
        searchValue || ""
      }`
    );
  };

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
                      {utype === 1 && (
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
                      <Box>
                        <Button
                          color="secondary"
                          variant="contained"
                          className={classes.profileMenuItem}
                          onClick={handleOpenUserAccountModal}
                        >
                          {HEADER_LABELS.USER_ACCOUNT}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Box>
          )}
          <UserProfileModal
            openUserAccountModal={openUserAccountModal}
            setOpenUserAccountModal={setOpenUserAccountModal}
          />
          {/* <Modal
            open={openUserAccountModal}
            onClose={handleCloseUserAccountModal}
          >
            <Fade in={openUserAccountModal}>
              <Box className={classes.userProfileModalContainer}>
                <Box p={2} className={classes.userProfileModalBox}>
                  <Box
                    className={classes.closeIconContainer}
                    onClick={handleCloseUserAccountModal}
                  >
                    <CancelIcon className={classes.closeIcon} />
                  </Box>
                  <Box
                    p={1}
                    className={classes.profileUserName}
                    textAlign="center"
                  >
                    <Typography color="textSecondary" variant="h5">
                      Hello, {name}
                    </Typography>
                  </Box>
                  <Accordion className={classes.accountSettingsAccordion}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className={classes.expandIcon} />
                      }
                      className={classes.accordionSummary}
                    >
                      <Typography color="primary" variant="button">
                        Account Settings
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box my={3} ml={2}>
                            <Typography color="primary">
                              Date of Birth:
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              format="MM/dd/yyyy"
                              margin="normal"
                              className={classes.dateOfBirthUtil}
                              value={userDateOfBirth}
                              InputProps={{ readOnly: true }}
                              KeyboardButtonProps={{
                                "aria-label": "date of birth",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Box my={2}>
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.fullWidth}
                          >
                            Reset My Password
                          </Button>
                        </Box>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Box my={1}>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleHistoryClick}
                      className={classes.fullWidth}
                    >
                      {HEADER_LABELS.USER_TRANSACTION_HISTORY}
                    </Button>
                  </Box>
                  <Box mt={3} textAlign="center">
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.userProfileItem}
                      onClick={handleLogoutClick}
                      disableElevation
                    >
                      {HEADER_LABELS.LOGOUT}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
