import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  Button,
} from "@material-ui/core";
import useStyles from "./VerifyEmailPage.Styles";
import useGetApi from "../../hooks/usePostApi";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import { getVerifyEmail } from "../../utils/api";
import { transformGetVerifyEmail } from "../../utils/api-transforms";
import { useRouteMatch, useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";
import AuthContext from "../../contexts/AuthContext";

function VerifyEmailPage() {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const { isUserLoggedIn } = useContext(AuthContext);
  const [countdown, setCountdown] = useState(5);

  const getVerifyEmailParams = useMemo(() => [], []);

  const {
    data: verifyEmailData,
    loading: verifyEmailLoading,
    error: verifyEmailError,
    triggerPostApi: verifyEmailTriggerGetApi,
  } = useGetApi(getVerifyEmail, getVerifyEmailParams, transformGetVerifyEmail);

  const handleResponseView = () => {
    if (verifyEmailData?.message === "email verified") {
      return (
        <Box className={classes.paper}>
          <Typography component="div" variant="h4" color="primary">
            Email Verified!
          </Typography>
          <Box py={3} style={{ borderTop: "2px solid black" }}>
            <Typography variant="body1" color="primary">
              Your Email Has been succesfully verified! You can now enjoy
              AVScope. Kindly Login to continue.
            </Typography>
          </Box>
          <Box pb={1}>
            <Typography variant="body1" color="primary">
              Redirecting to Login in {countdown} seconds...
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </Box>
        </Box>
      );
    } else if (verifyEmailData?.message === "already verified") {
      return (
        <Box className={classes.paper}>
          <Typography component="div" variant="h4" color="primary">
            Email Already Verified
          </Typography>
          <Box py={3} style={{ borderTop: "2px solid black" }}>
            <Typography variant="body1" color="primary">
              Your Email has already been verified previously. Kindly Login to
              continue using AVScope.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box className={classes.paper}>
          <Typography component="div" variant="h4" color="primary">
            Verify Your Email
          </Typography>
          <Box py={3} style={{ borderTop: "2px solid black" }}>
            <Typography variant="body1" color="primary">
              Your Verification Email has been sent to your mail. Kindly follow
              the instructions provided to verify your Email.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerifyEmailClick}
            >
              Verify Email
            </Button>
          </Box>
        </Box>
      );
    }
  };

  const handleLoginClick = () => {
    history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);
  };

  const handleVerifyEmailClick = () => {
    verifyEmailTriggerGetApi(params.userId);
  };

  useEffect(() => {
    if (verifyEmailData) {
      setTimeout(() => {
        history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);
      }, 5000);
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
  });

  useEffect(() => {
    if (isUserLoggedIn) history.push(APP_ROUTES.HOME_PAGE.path);
  }, [history, isUserLoggedIn]);

  if (verifyEmailLoading) return <PageLoader />;

  if (verifyEmailError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <CssBaseline />
      {handleResponseView()}
    </Container>
  );
}

export default VerifyEmailPage;
