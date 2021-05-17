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
  Button,
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import usePostApi from "../../hooks/usePostApi";
import { postAddCreator } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./SignupPage.Styles";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";
import AuthContext from "../../contexts/AuthContext";

function AddCreatorPage() {
  const history = useHistory();
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    address: "",
    office: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    bankAccount: "",
    panCard: "",
  });

  const postAddCreatorParams = useMemo(() => [], []);
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
    data: addCreatorData,
    loading: addCreatorLoading,
    error: addCreatorError,
    triggerPostApi: addCreatorTriggerPostApi,
  } = usePostApi(postAddCreator, postAddCreatorParams, undefined);

  useEffect(() => {
    if (addCreatorData) {
      setUsername(addCreatorData.username);
      setIsUserLoggedIn(true);
      setUserId(addCreatorData.userId);
      setUtype(addCreatorData.utype);
      history.push(APP_ROUTES.HOME_PAGE.path);
    }
  }, [
    history,
    setUserId,
    setIsUserLoggedIn,
    setUsername,
    setUtype,
    addCreatorData,
  ]);

  const handleTextFieldChange = event => {
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    addCreatorTriggerPostApi({
      fname: textFields.firstName,
      lname: textFields.lastName,
      username: textFields.email,
      password: textFields.password,
    });
  };

  if (addCreatorLoading) return <PageLoader />;

  if (addCreatorError)
    return (
      <PageError message="Opps.. Something went wrong while adding Creator." />
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
          Add Creator
        </Typography>
        <Box className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                id="outlined-multiline-static"
                rows={4}
                label="Address"
                className={classes.textField}
                onChange={handleTextFieldChange}
                autoFocus
                required
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                label="Office"
                name="office"
                autoComplete="office"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                label="City"
                name="city"
                autoComplete="city"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                name="state"
                label="State"
                autoComplete="state"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                name="zipcode"
                label="Zip Code"
                autoComplete="zipcode"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                name="phone"
                label="Phone Number"
                autoComplete="phone"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                name="bankAccount"
                label="Bank Account"
                autoComplete="bankAccount"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id="outlined-basic"
                name="panCard"
                label="PAN Card Number"
                autoComplete="panCard"
                className={classes.textField}
                onChange={handleTextFieldChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Add Creator
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default AddCreatorPage;
