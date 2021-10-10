import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  CssBaseline,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import usePostApi from "../../hooks/usePostApi";
import { postForgotPassword } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./ForgotPasswordPage.Styles";
import { transformPostForgotPasswordResponse } from "../../utils/api-transforms";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";

function ForgotPasswordPage() {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const postForgotPasswordParams = useMemo(() => [], []);

  const {
    // eslint-disable-next-line no-unused-vars
    data: forgotPasswordData,
    loading: forgotPasswordLoading,
    error: forgotPasswordError,
    triggerPostApi: forgotPasswordTriggerPostApi,
  } = usePostApi(
    postForgotPassword,
    postForgotPasswordParams,
    transformPostForgotPasswordResponse
  );

  const handleTextFieldChange = event => {
    setUsername(event.target.value);
  };

  const handleLoginInClick = () =>
    history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);

  const handleSignupClick = () =>
    history.push(`${APP_ROUTES.SIGNUP_PAGE.path}`);

  const handleFormSubmit = () => {
    forgotPasswordTriggerPostApi({ username: username });
  };

  if (forgotPasswordLoading) return <PageLoader />;

  if (forgotPasswordError)
    return <PageError message="Oops.. Something went wrong while resetting." />;

  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: "24px" }}>
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockTwoToneIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Account Recovery
        </Typography>
        <Box py={2}>
          <Typography variant="body1" color="primary">
            Forgot Password? It happens. Kindly enter your email address
            associated with your account below and we will send a link to your
            account with further instructions to reset your password.
          </Typography>
        </Box>
        <Box className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email Address"
            name="username"
            autoComplete="email"
            className={classes.textField}
            onChange={handleTextFieldChange}
            autoFocus
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={handleFormSubmit}
          >
            Request Reset Link
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={handleLoginInClick}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"Remembered? Login"}
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={handleSignupClick}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPasswordPage;
