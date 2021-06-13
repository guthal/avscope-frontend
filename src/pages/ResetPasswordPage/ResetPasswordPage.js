import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import usePostApi from "../../hooks/usePostApi";
import { postResetPassword } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./ResetPasswordPage.Styles";
import { transformPostResetPasswordResponse } from "../../utils/api-transforms";
import { useHistory, useRouteMatch } from "react-router";
import { APP_ROUTES } from "../../configs/app";

function ResetPasswordPage() {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const classes = useStyles();

  const [textFields, setTextFields] = useState({
    password: "",
    retypePassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const postLoginParams = useMemo(() => [], []);

  const {
    data: resetPasswordData,
    loading: resetPasswordLoading,
    error: resetPasswordError,
    triggerPostApi: resetPasswordTriggerPostApi,
  } = usePostApi(
    postResetPassword,
    postLoginParams,
    transformPostResetPasswordResponse
  );

  const handleTextFieldChange = event => {
    setPasswordsMatch(true);
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginInClick = () =>
    history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);

  const handleFormSubmit = () => {
    if (textFields.password === textFields.retypePassword) {
      resetPasswordTriggerPostApi(params.userId, {
        password: textFields.password,
      });
    } else {
      setPasswordsMatch(false);
    }
  };

  if (resetPasswordLoading) return <PageLoader />;

  if (resetPasswordError)
    return <PageError message="Oops.. Something went wrong while resetting." />;

  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: "24px" }}>
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockTwoToneIcon color="primary" />
        </Avatar>
        <Box style={{ borderBottom: "2px solid black" }}>
          <Typography component="h1" variant="h5" color="primary">
            Reset your Password
          </Typography>
        </Box>
        <Box className={classes.form}>
          {resetPasswordData === undefined ? (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="New Password"
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                color="primary"
                onClick={handleFormSubmit}
              >
                Reset Password
              </Button>
            </Box>
          ) : (
            <Box textAlign="center">
              <Typography variant="h6" color="primary">
                Password Reset Successful!
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                color="primary"
                onClick={handleLoginInClick}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPasswordPage;
