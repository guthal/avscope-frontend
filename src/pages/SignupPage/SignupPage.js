import React, { useState, useEffect, useMemo } from "react";
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

function SignupPage() {
  const history = useHistory();
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    retypePassword: "",
  });

  const postContentsParams = useMemo(() => [], []);

  const handleLoginClick = () => history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerPostApi: signupTriggerPostApi,
  } = usePostApi(postSignup, postContentsParams, transformPostSignupResponse);

  const handleTextFieldChange = event => {
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    signupTriggerPostApi(textFields);
  };

  if (contentsLoading) return <PageLoader />;

  if (contentsError)
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
                id="phone"
                className={classes.textField}
                onChange={handleTextFieldChange}
                label="Phone Number"
                name="phone"
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
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Checkbox value="allowExtraEmails" color="primary" required />
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
