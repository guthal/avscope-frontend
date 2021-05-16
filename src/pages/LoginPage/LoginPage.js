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
import usePostApi from "../../hooks/usePostApi";
import { postLogin } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./LoginPage.Styles";
import { transformPostLoginResponse } from "../../utils/api-transforms";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";
import AuthContext from "../../contexts/AuthContext";

function LoginPage() {
  const history = useHistory();
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
  });
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
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (loginData) {
      setUsername(loginData.username);
      setIsUserLoggedIn(true);
      setUserId(loginData.userId);
      setUtype(loginData.utype);
      history.push(APP_ROUTES.HOME_PAGE.path);
    }
  }, [history, loginData, setUserId, setIsUserLoggedIn, setUsername, setUtype]);

  const handleSignupClick = () =>
    history.push(`${APP_ROUTES.SIGNUP_PAGE.path}`);

  const handleFormSubmit = () => {
    loginTriggerPostApi(textFields);
  };

  if (loginLoading) return <PageLoader />;

  if (loginError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  const Copyright = () => {
    return (
      <Typography variant="body2" color="secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          AVScope
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Log in
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            onClick={handleFormSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;
