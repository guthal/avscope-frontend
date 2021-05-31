import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  CssBaseline,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import PageLoader from "../../components/PageLoader";
import useStyles from "./PayoutPage.Styles";
import usePostApi from "../../hooks/usePostApi";
import {
  transformPostGetContentsRevenue,
  transformPostPayCreatorEarning,
} from "../../utils/api-transforms";
import { postGetContentsRevenue, postPayCreatorEarning } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";
import { useRouteMatch } from "react-router";

function PayoutPage() {
  const { userId } = useContext(AuthContext);
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;

  const toDate = new Date(Date.now());
  const intermediateDate = new Date(toDate);
  const fromDate = new Date(intermediateDate.setHours(0, 0, 0, 0));
  const classes = useStyles();

  const [transactionId, setTransactionId] = useState("");

  const postCreatorPayoutParams = useMemo(() => [userId], [userId]);
  const postPayCreatorEarningParams = useMemo(() => [], []);

  const {
    data: creatorPayoutData,
    loading: creatorPayoutLoading,
    // eslint-disable-next-line no-unused-vars
    error: creatorPayoutError,
    triggerPostApi: creatorPayoutTriggerApi,
  } = usePostApi(
    postGetContentsRevenue,
    postCreatorPayoutParams,
    transformPostGetContentsRevenue
  );

  const {
    // eslint-disable-next-line no-unused-vars
    data: payCreatorEarningData,
    loading: payCreatorEarningLoading,
    // eslint-disable-next-line no-unused-vars
    error: payCreatorEarningError,
    triggerPostApi: payCreatorEarningTriggerApi,
  } = usePostApi(
    postPayCreatorEarning,
    postPayCreatorEarningParams,
    transformPostPayCreatorEarning
  );

  const [selectedFromDate, setSelectedFromDate] = useState(
    fromDate.setDate(fromDate.getDate() - 7)
  );
  const [selectedToDate, setSelectedToDate] = useState(toDate);

  const handleFromDateChange = date => {
    const tempDate = new Date(date.setHours(0, 0, 0, 0));
    setSelectedFromDate(tempDate);
  };

  const handleToDateChange = date => {
    date.setHours(23, 59, 59, 59);
    const tempDate = new Date(date.setDate(date.getDate() - 1));
    console.log("tempDate: ", tempDate.toISOString());
    setSelectedToDate(tempDate);
  };

  const handleTransactionIdChange = event =>
    setTransactionId(event.target.value);

  useEffect(() => {
    if (userId) {
      console.log(
        "fromDate: ",
        new Date(selectedFromDate).toISOString(),
        "toDate: ",
        new Date(selectedToDate).toISOString()
      );
      creatorPayoutTriggerApi({
        fromDate: new Date(selectedFromDate).toISOString(),
        toDate: new Date(selectedToDate).toISOString(),
        creatorId: params.creatorID,
      });
    }
  }, [
    creatorPayoutTriggerApi,
    params.creatorID,
    selectedFromDate,
    selectedToDate,
    userId,
  ]);

  useEffect(() => {
    payCreatorEarningTriggerApi({
      transactionId: "", // enter what transactionId to send
    });
  }, [payCreatorEarningTriggerApi]);

  if (creatorPayoutLoading || payCreatorEarningLoading) return <PageLoader />;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          className={classes.calendar}
        >
          <Grid container className={classes.dateGridContainer}>
            <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                disableFuture
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="from-date-picker-inline"
                label="From"
                value={selectedFromDate}
                onChange={handleFromDateChange}
                className={classes.calendar}
                InputProps={{ readOnly: true }}
                KeyboardButtonProps={{
                  "aria-label": "change from date",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                disableFuture
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="to-date-picker-inline"
                label="To"
                minDate={selectedFromDate}
                value={selectedToDate}
                onChange={handleToDateChange}
                className={classes.calendar}
                InputProps={{ readOnly: true }}
                KeyboardButtonProps={{
                  "aria-label": "change to date",
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12}>
        <Box p={1} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Sr. no</TableCell>
                <TableCell align="left">Content title</TableCell>
                <TableCell align="center">Revenue Generated</TableCell>
                <TableCell align="center">Creator Earnings</TableCell>
                <TableCell align="center">Commission Earned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.body}>
              {creatorPayoutData?.map((content, index) => (
                <TableRow key={`${content.contentTitle}-${index}`}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {content.contentTitle}
                  </TableCell>
                  <TableCell align="center">
                    ₹ {Number(content.revenue).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    ₹ {Number(content.earnings).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    ₹ {Number(content.revenue - content.earnings).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box mt={3}>
            <Typography variant="h5" align="center" color="secondary">
              Your Commission Earnings: {"₹ "}
              {Number(
                creatorPayoutData?.reduce(
                  (totalEarnings, content) =>
                    (totalEarnings += content.revenue - content.earnings),
                  0
                )
              ).toFixed(2)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={2}>
            <Typography variant="h5" align="center" color="secondary">
              Creator Payment: {"₹ "}
              {Number(
                creatorPayoutData?.reduce(
                  (totalEarnings, content) =>
                    (totalEarnings += content.earnings),
                  0
                )
              ).toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mb={4}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Email Creator
            </Typography>
            <Box className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Creator ID"
                name="creatorId"
                autoComplete="creatorId"
                value={params.creatorID}
                className={classes.textField}
                disabled
                fullWidth
              />
              <TextField
                variant="outlined"
                margin="normal"
                name="transactionId"
                label="Transaction ID"
                autoComplete="transactionId"
                className={classes.textField}
                onChange={handleTransactionIdChange}
                value={transactionId}
                required
                fullWidth
              />
              <Typography align="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  color="primary"
                >
                  Send Email
                </Button>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Grid>
  );
}

export default PayoutPage;
