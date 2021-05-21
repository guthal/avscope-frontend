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
  Button,
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import usePostApi from "../../hooks/usePostApi";
import { postAddCreator } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./AddCreatorPage.Styles";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";

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
    data: addCreatorData,
    loading: addCreatorLoading,
    error: addCreatorError,
    triggerPostApi: addCreatorTriggerPostApi,
  } = usePostApi(postAddCreator, postAddCreatorParams, undefined);

  useEffect(() => {
    if (addCreatorData) {
      history.push(APP_ROUTES.ADMIN_DASHBOARD.path);
    }
  }, [addCreatorData, history]);

  const handleTextFieldChange = event => {
    setTextFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    addCreatorTriggerPostApi({
      username: textFields.username,
      address: textFields.address,
      office: textFields.office,
      city: textFields.city,
      state: textFields.state,
      zipcode: textFields.zipcode,
      phone: textFields.phone,
      bankAccount: textFields.bankAccount || null,
      panCard: textFields.panCard || null,
    });
  };

  if (addCreatorLoading) {
    return <PageLoader />;
  }

  if (addCreatorError) {
    return (
      <PageError message="Opps.. Something went wrong while adding Creator." />
    );
  }

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
                variant="outlined"
                label="Email"
                name="username"
                autoComplete="username"
                className={classes.textField}
                onChange={handleTextFieldChange}
                autoFocus
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Address"
                name="address"
                autoComplete="address"
                className={classes.textField}
                onChange={handleTextFieldChange}
                autoFocus
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                name="bankAccount"
                label="Bank Account"
                autoComplete="bankAccount"
                className={classes.textField}
                onChange={handleTextFieldChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="panCard"
                label="PAN Card Number"
                autoComplete="panCard"
                className={classes.textField}
                onChange={handleTextFieldChange}
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
