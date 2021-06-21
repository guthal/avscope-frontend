import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  CssBaseline,
  Avatar,
  TextField,
  Checkbox,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import GoogleIcon from "../../assets/google.svg";
import usePostApi from "../../hooks/usePostApi";
import { postLogin } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import useStyles from "./LoginPage.Styles";
import { transformPostLoginResponse } from "../../utils/api-transforms";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";
import AuthContext from "../../contexts/AuthContext";
import { ENDPOINTS } from "../../configs/api";

function LoginPage() {
  const history = useHistory();
  const classes = useStyles();

  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
  });
  const [loginErrorFlag, setLoginErrorFlag] = useState(false);

  const postLoginParams = useMemo(() => [], []);
  const {
    isUserLoggedIn,
    setUsername,
    setIsUserLoggedIn,
    setUserId,
    setUtype,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) history.push(APP_ROUTES.HOME_PAGE.path);
  }, [history, isUserLoggedIn]);

  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
    triggerPostApi: loginTriggerPostApi,
  } = usePostApi(postLogin, postLoginParams, transformPostLoginResponse);

  const handleTextFieldChange = event => {
    setLoginErrorFlag(false);
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGoogleLoginClick = () => {};

  const handleFacebookLoginClick = () => {};

  useEffect(() => {
    if (loginData) {
      setUsername(loginData.username);
      setIsUserLoggedIn(true);
      setUserId(loginData.userId);
      setUtype(loginData.utype);
      history.push(APP_ROUTES.HOME_PAGE.path);
    }
  }, [history, loginData, setUserId, setIsUserLoggedIn, setUsername, setUtype]);

  const handleForgotPasswordClick = () =>
    history.push(`${APP_ROUTES.FORGOT_PASSWORD_PAGE.path}`);

  const handleSignupClick = () =>
    history.push(`${APP_ROUTES.SIGNUP_PAGE.path}`);

  const handleFormSubmit = () => {
    loginTriggerPostApi(textFields);
  };

  useEffect(() => {
    if (loginError) {
      setLoginErrorFlag(true);
    }
  }, [loginError]);

  if (loginLoading) return <PageLoader />;

  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: "24px" }}>
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Login
        </Typography>
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
          <TextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            className={classes.textField}
            onChange={handleTextFieldChange}
            required
            fullWidth
          />
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Checkbox value="remember" color="primary" />
            <Typography color="primary">Remember Me</Typography>
          </Box>
          {loginErrorFlag && (
            <Box className={classes.loginError}>
              <Typography align="center" variant="subtitle1">
                Invalid User Credentials
              </Typography>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={handleFormSubmit}
          >
            Login
          </Button>
          <Box className={classes.iconsContainer}>
            <Box textAlign="center">
              <Box className={classes.iconBox} onClick={handleGoogleLoginClick}>
                <Typography
                  color="primary"
                  component="a"
                  href={`${ENDPOINTS.GET_GOOGLE_LOGIN}`}
                >
                  Login using
                </Typography>
                <img
                  src={GoogleIcon}
                  alt="google-login"
                  className={classes.googleIcon}
                />
              </Box>
              <Box
                className={classes.iconBox}
                onClick={handleFacebookLoginClick}
              >
                <Typography
                  color="primary"
                  component="a"
                  href={`${ENDPOINTS.GET_FACEBOOK_LOGIN}`}
                >
                  Login using
                </Typography>
                <FacebookIcon className={classes.facebookIcon} />
              </Box>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={handleForgotPasswordClick}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                Forgot password?
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

export default LoginPage;
