import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  CssBaseline,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import useGetApi from "../../hooks/useGetApi";
import { getContents } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./SignupPage.Styles";
import { useHistory } from "react-router";
import { transformGetContents } from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";

function SignupPage() {
  const classes = useStyles();
  const history = useHistory();
  const getContentsParams = useMemo(() => ["param1", "param2"], []);

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerApi: contentsTriggerApi,
  } = useGetApi(getContents, getContentsParams, transformGetContents);

  const handleCardClick = contentID =>
    history.push(`${APP_ROUTES.CONTENT_PAGE.path}/${contentID}`);

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

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
        <form className={classes.form}>
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
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            {/* <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="otp"
                    label="Enter OTP"
                    name="otp"
                    color="secondary"
                    type="number"
                  />
                </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                className={classes.textField}
                label="Phone Number"
                name="phone"
              />
            </Grid>
            {/* <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="otp"
                    label="Enter OTP"
                    name="otp"
                    color="secondary"
                    type="number"
                  />
                </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                className={classes.textField}
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
                name="password"
                label="Retype Password"
                className={classes.textField}
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
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignupPage;
