import React, { useMemo, useContext, useEffect, useState } from "react";
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
import usePostApi from "../../hooks/usePostApi";
import PageError from "../../components/PageError";
import PageLoader from "../PageLoader";
import {
  getLogoutUser,
  postDoBGenderEntry,
  postForgotPassword,
} from "../../utils/api";
import { transformPostForgotPasswordResponse } from "../../utils/api-transforms";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router";
import { APP_ROUTES, HEADER_LABELS } from "../../configs/app";

const UserProfileModal = ({
  openUserAccountModal,
  setOpenUserAccountModal = () => {},
  dOBAndGenderVerified = true,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [openResetPasswordMsg, setOpenResetPasswordMsg] = useState(false);
  const [userLocalDoB, setUserLocalDoB] = useState();
  const [userLocalGender, setUserLocalGender] = useState("");

  const {
    userId,
    username,
    name,
    userDateOfBirth,
    userGender,
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

  const postDoBGenderParams = useMemo(() => [userId], [userId]);

  const {
    data: doBGenderData,
    loading: dobGenderLoading,
    error: doBGenderError,
    triggerPostApi: dobGenderTriggerPostApi,
  } = usePostApi(postDoBGenderEntry, postDoBGenderParams, undefined);

  const postForgotPasswordParams = useMemo(() => [], []);

  const {
    data: forgotPasswordData,
    loading: forgotPasswordLoading,
    error: forgotPasswordError,
    triggerPostApi: forgotPasswordTriggerPostApi,
  } = usePostApi(
    postForgotPassword,
    postForgotPasswordParams,
    transformPostForgotPasswordResponse
  );

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

  const handleCloseResetPassswordMsg = () => {
    setOpenResetPasswordMsg(false);
  };

  const handleResetPasswordClick = event => {
    event.preventDefault();
    setOpenResetPasswordMsg(true);
    forgotPasswordTriggerPostApi({ username: username });
  };

  const handleDoBChange = event => {
    setUserLocalDoB(event);
  };

  const handleGenderChange = event => {
    setUserLocalGender(event.target.value);
  };

  const handleSubmitDoBGender = () => {
    dobGenderTriggerPostApi({
      userId: userId,
      dateOfBirth: userLocalDoB,
      gender: userLocalGender,
    });
  };

  useEffect(() => {
    if (forgotPasswordData) {
      setTimeout(() => {
        handleCloseResetPassswordMsg();
      }, 5000);
    }
  }, [forgotPasswordData]);

  useEffect(() => {
    if (doBGenderData) {
      window.open(APP_ROUTES.HOME_PAGE.path, "_self");
    }
  }, [doBGenderData]);

  useEffect(() => {
    if (logoutData) {
      setUsername("");
      setUserId("");
      setUtype("");
      setIsUserLoggedIn(false);
      window.location.href = "/login";
    }
  }, [logoutData, setUserId, setIsUserLoggedIn, setUsername, setUtype]);

  if (dobGenderLoading || forgotPasswordLoading) return <PageLoader />;

  if (logoutError || doBGenderError || forgotPasswordError)
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
                  Your Date of Birth and Gender is required for functionality
                  purposes. Kindly Select from options below and Submit to
                  Continue.
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
                        value={userDateOfBirth || userLocalDoB}
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
                    <Box mb={1}>
                      <Select
                        value={userGender || userLocalGender || "default"}
                        style={{ color: "black" }}
                        disabled={dOBAndGenderVerified}
                        onChange={handleGenderChange}
                      >
                        <MenuItem value="default" color="primary">
                          Select from below
                        </MenuItem>
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
                {!dOBAndGenderVerified &&
                  userLocalDoB !== undefined &&
                  userLocalGender !== "" &&
                  userLocalGender !== "default" && (
                    <Grid container>
                      <Grid item xs={12}>
                        <Box my={1}>
                          <Typography color="error">
                            Note: Kindly make sure you have given proper
                            information. Your information is safe with us.
                            Information once submitted can only be changed by
                            requesting a ticket.
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box my={2}>
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.fullWidth}
                            onClick={handleSubmitDoBGender}
                          >
                            Submit Info
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                {dOBAndGenderVerified && (
                  <Grid item xs={12}>
                    {openResetPasswordMsg && (
                      <Box>
                        <Typography color="textPrimary" variant="body1">
                          Kindly Check your Email for Reset Password Link
                        </Typography>
                      </Box>
                    )}
                    <Box my={2}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className={classes.fullWidth}
                        onClick={handleResetPasswordClick}
                      >
                        Reset My Password
                      </Button>
                    </Box>
                  </Grid>
                )}
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
