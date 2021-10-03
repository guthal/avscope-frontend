import React, { useMemo, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Modal,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./UserProfileModal.Styles";
import AuthContext from "../../contexts/AuthContext";
import useGetApi from "../../hooks/useGetApi";
import PageError from "../../components/PageError";
import { getLogoutUser } from "../../utils/api";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router";
import { APP_ROUTES, HEADER_LABELS } from "../../configs/app";

const UserProfileModal = ({
  openUserAccountModal,
  setOpenUserAccountModal,
  dOBAndGenderVerified = true,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    userId,
    name,
    userDateOfBirth,
    setUsername,
    setIsUserLoggedIn,
    setUserId,
    setUtype,
  } = useContext(AuthContext);

  const getLogoutParams = useMemo(() => [], []);

  const {
    data: logoutData,
    error: logoutError,
    triggerApi: logoutTriggerGetApi,
  } = useGetApi(getLogoutUser, getLogoutParams, undefined);

  const handleCloseUserAccountModal = () => {
    setOpenUserAccountModal(false);
  };

  const handleHistoryClick = () => {
    setOpenUserAccountModal(false);
    history.push(`${APP_ROUTES.HISTORY_PAGE.path}/${userId}`);
  };

  const handleLogoutClick = () => {
    setOpenUserAccountModal(false);
    logoutTriggerGetApi();
  };

  const handleDoBChange = () => {};

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
    <Modal open={openUserAccountModal} onClose={handleCloseUserAccountModal}>
      <Fade in={openUserAccountModal}>
        <Box className={classes.userProfileModalContainer}>
          <Box p={2} className={classes.userProfileModalBox}>
            {dOBAndGenderVerified && (
              <Box
                className={classes.closeIconContainer}
                onClick={handleCloseUserAccountModal}
              >
                <CancelIcon className={classes.closeIcon} />
              </Box>
            )}
            <Box p={1} className={classes.profileUserName} textAlign="center">
              <Typography color="textSecondary" variant="h5">
                Hello, {name}
              </Typography>
            </Box>
            {!dOBAndGenderVerified && (
              <Box textAlign="center">
                <Typography className={classes.dOBAgeUnverifiedBanner}>
                  Your Date of Birth and Gender is required for browsing through
                  certain content. Kindly Select from options below and Submit.
                </Typography>
              </Box>
            )}
            <Accordion
              className={classes.accountSettingsAccordion}
              defaultExpanded={!dOBAndGenderVerified}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
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
                      <Typography color="primary">Date of Birth:</Typography>
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
                        disabled={dOBAndGenderVerified}
                        onChange={handleDoBChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box ml={2}>
                      <Typography color="primary">Gender:</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box ml={2}>
                      <Select
                        value="male"
                        style={{ color: "black" }}
                        disabled={dOBAndGenderVerified}
                      >
                        <MenuItem value="male" color="primary">
                          Male
                        </MenuItem>
                        <MenuItem value="female" color="primary">
                          Female
                        </MenuItem>
                        <MenuItem value="other" color="primary">
                          Other
                        </MenuItem>
                      </Select>
                    </Box>
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
            {dOBAndGenderVerified && (
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
            )}
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
    </Modal>
  );
};

export default UserProfileModal;
