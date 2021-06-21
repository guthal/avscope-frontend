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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import PasswordStrengthBar from "react-password-strength-bar";
import DateFnsUtils from "@date-io/date-fns";
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
    gender: "male",
    password: "",
    retypePassword: "",
    checkbox: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [minPasswordLengthCheck, setMinPasswordLengthCheck] = useState(true);
  const [signupDisabled, setSignupDisabled] = useState(true);
  const tempDate = new Date(Date.now());
  const [dateOfBirth, setDateOfBirth] = useState(tempDate);

  const postSignupParams = useMemo(() => [], []);
  const { isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isUserLoggedIn) history.push(APP_ROUTES.HOME_PAGE.path);
  }, [history, isUserLoggedIn]);

  const handleLoginClick = () => history.push(`${APP_ROUTES.LOGIN_PAGE.path}`);

  const handleDateOfBirthChange = date => {
    setDateOfBirth(date);
  };

  const {
    data: signupData,
    loading: signupLoading,
    error: signupError,
    triggerPostApi: signupTriggerPostApi,
  } = usePostApi(postSignup, postSignupParams, transformPostSignupResponse);

  const handleTextFieldChange = event => {
    setPasswordsMatch(true);
    setMinPasswordLengthCheck(true);
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
    if (textFields.password.length >= 8) {
      if (
        textFields.password === textFields.retypePassword &&
        textFields.checkbox
      ) {
        signupTriggerPostApi({
          fname: textFields.firstName,
          lname: textFields.lastName,
          username: textFields.email,
          dateOfBirth: dateOfBirth.toISOString(),
          gender: textFields.gender,
          password: textFields.password,
        });
      } else {
        setPasswordsMatch(false);
      }
    } else {
      setMinPasswordLengthCheck(false);
    }
  };

  if (signupLoading) return <PageLoader />;

  if (signupError)
    return (
      <PageError message="Oops.. Something went wrong while Signing Up." />
    );

  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: "24px" }}>
      <CssBaseline />
      {signupData === undefined ? (
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Sign Up
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
              <Grid item xs={8}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  className={classes.calendar}
                >
                  <KeyboardDatePicker
                    disableFuture
                    required
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-of-birth-picker-inline"
                    label="DOB"
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    className={classes.calendar}
                    InputProps={{ readOnly: true }}
                    KeyboardButtonProps={{
                      "aria-label": "change date of birth",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="gender-select">Gender</InputLabel>
                <Select
                  required
                  labelId="gender-select"
                  id="gender-select"
                  name="gender"
                  className={classes.gender}
                  value={textFields.gender}
                  onChange={handleTextFieldChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
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
                <PasswordStrengthBar
                  password={textFields.password}
                  scoreWordStyle={{ color: "black", textAlign: "center" }}
                  shortScoreWord="Password must have atleast 8 characters"
                  minLength="8"
                />
              </Grid>
              {!minPasswordLengthCheck && (
                <Box px={2}>
                  <Typography variant="subtitle2" style={{ color: "red" }}>
                    Password must have atleast 8 characters
                  </Typography>
                </Box>
              )}
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
      ) : (
        <Box className={classes.paper}>
          <Typography component="div" variant="h4" color="primary">
            Email Verification
          </Typography>
          <Box py={3} style={{ borderTop: "2px solid black" }}>
            <Typography variant="body1" color="primary">
              A Verification Email has been sent to your mail{" "}
              <strong>{textFields.email}</strong>. Kindly follow the
              instructions provided to verify your Email.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
            >
              Verified? Login
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default SignupPage;
