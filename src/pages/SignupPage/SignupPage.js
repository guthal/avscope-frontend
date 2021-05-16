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
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import usePostApi from "../../hooks/usePostApi";
import { postSignup } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./SignupPage.Styles";
import { transformPostSignupResponse } from "../../utils/api-transforms";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";
import AuthContext from "../../contexts/AuthContext";

function SignupPage() {
  const history = useHistory();
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
    checkbox: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [signupDisabled, setSignupDisabled] = useState(true);

  const postSignupParams = useMemo(() => [], []);
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

  const handleLoginClick = () => history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);

  const {
    data: signupData,
    loading: signupLoading,
    error: signupError,
    triggerPostApi: signupTriggerPostApi,
  } = usePostApi(postSignup, postSignupParams, transformPostSignupResponse);

  useEffect(() => {
    if (signupData) {
      setUsername(signupData.username);
      setIsUserLoggedIn(true);
      setUserId(signupData.userId);
      setUtype(signupData.utype);
      history.push(APP_ROUTES.HOME_PAGE.path);
    }
  }, [
    history,
    setUserId,
    setIsUserLoggedIn,
    setUsername,
    setUtype,
    signupData,
  ]);

  const handleTextFieldChange = event => {
    setPasswordsMatch(true);
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = () => {
    setTextFields(prev => ({
      ...prev,
      checkbox: !prev.checkbox,
    }));
  };

  useEffect(() => {
    setSignupDisabled(!textFields.checkbox);
  }, [textFields.checkbox]);

  const handleFormSubmit = () => {
    if (
      textFields.password === textFields.retypePassword &&
      textFields.checkbox
    ) {
      signupTriggerPostApi({
        fname: textFields.firstName,
        lname: textFields.lastName,
        username: textFields.email,
        password: textFields.password,
      });
    } else {
      setPasswordsMatch(false);
    }
  };

  if (signupLoading) return <PageLoader />;

  if (signupError)
    return (
      <PageError message="Opps.. Something went wrong while Signing Up." />
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
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Sign up
        </Typography>
        <Box className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                className={classes.textField}
                onChange={handleTextFieldChange}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                className={classes.textField}
                onChange={handleTextFieldChange}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                className={classes.textField}
                onChange={handleTextFieldChange}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                className={classes.textField}
                onChange={handleTextFieldChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {!passwordsMatch && (
              <Box px={2}>
                <Typography variant="subtitle2" style={{ color: "red" }}>
                  Passwords do not match
                </Typography>
              </Box>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="retypePassword"
                label="Retype Password"
                className={classes.textField}
                onChange={handleTextFieldChange}
                color="primary"
                type="password"
                id="retypePassword"
                autoComplete="current-password"
              />
            </Grid>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                name="checkbox"
                value={textFields.checkbox}
                color="primary"
                onChange={handleCheckboxChange}
              />
              <Typography color="primary">
                I agree to accept all terms and conditions
              </Typography>
            </Box>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
            disabled={signupDisabled}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link
                onClick={handleLoginClick}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignupPage;
