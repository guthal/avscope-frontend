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
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import PageLoader from "../../components/PageLoader";
import useStyles from "./CreatorProfile.Styles";
import usePostApi from "../../hooks/usePostApi";
import { transformPostGetContentsRevenue } from "../../utils/api-transforms";
import { postGetContentsRevenue } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";
import "./index.css";

function CreatorProfile() {
  const { userId } = useContext(AuthContext);
  const toDate = new Date(Date.now());
  const intermediateDate = new Date(toDate);
  const fromDate = new Date(intermediateDate.setHours(0, 0, 0, 0));
  const classes = useStyles();

  const postGetContentsRevenueParams = useMemo(() => [userId], [userId]);
  const {
    data: contentRevenueData,
    loading: contentRevenueLoading,
    // eslint-disable-next-line no-unused-vars
    error: contentRevenueError,
    triggerPostApi: contentRevenueTriggerApi,
  } = usePostApi(
    postGetContentsRevenue,
    postGetContentsRevenueParams,
    transformPostGetContentsRevenue
  );

  const [selectedFromDate, setSelectedFromDate] = useState(
    fromDate.setDate(fromDate.getDate() - 7)
  );
  const [selectedToDate, setSelectedToDate] = useState(toDate);

  const handleFromDateChange = date => {
    const tempDate = new Date(date.setHours(0, 0, 0, 0));
    setSelectedFromDate(tempDate);
  };

  const handleToDateChange = date => setSelectedToDate(date);

  const getPurchaseTypeText = purchaseType => {
    if (purchaseType === "b") return "Buy";
    if (purchaseType === "r") return "Rent";
    if (purchaseType === "w") return "Weekly";
  };

  useEffect(() => {
    if (userId) {
      contentRevenueTriggerApi({
        fromDate: new Date(selectedFromDate).toISOString(),
        toDate: new Date(selectedToDate).toISOString(),
        creatorId: userId,
      });
    }
  }, [contentRevenueTriggerApi, selectedFromDate, selectedToDate, userId]);

  if (contentRevenueLoading) return <PageLoader />;

  return (
    <Container maxWidth="lg" className={classes.mainRoot}>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            className={classes.calendar}
          >
            <Grid
              container
              justify="space-around"
              className={classes.dateGridContainer}
            >
              <Grid item>
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
              <Grid item>
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
                  <TableCell align="center">Purchase Type</TableCell>
                  <TableCell align="center">Revenue</TableCell>
                  <TableCell align="center">Earnings</TableCell>
                  <TableCell align="center">No. of purchases</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.body}>
                {contentRevenueData?.map((content, index) => (
                  <TableRow key={`${content.contentTitle}-${index}`}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {content.contentTitle}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {getPurchaseTypeText(content.purchaseType)}
                    </TableCell>
                    <TableCell align="center">
                      ₹ {Number(content.revenue).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      ₹ {Number(content.earnings).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      {content.purchaseCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4} justify="flex-end">
        <Grid item xs={12}>
          <Box my={3}>
            <Typography variant="h5" align="right" color="secondary">
              Your Total Earnings: {"₹ "}
              {Number(
                contentRevenueData?.reduce(
                  (totalEarnings, content) =>
                    (totalEarnings += content.earnings),
                  0
                )
              ).toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreatorProfile;
