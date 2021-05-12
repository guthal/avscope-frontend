import React, { useEffect, useMemo, useState } from "react";
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
// import { APP_ROUTES } from "../../configs/app";

function LoginPage() {
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    email: "",
    password: "",
  });
  const postLoginParams = useMemo(() => [], []);

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
            name="email"
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
              <Link href="/signup" variant="body2">
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
