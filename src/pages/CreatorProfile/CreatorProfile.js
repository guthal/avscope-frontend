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
                <TableCell align="left">Purchase Type</TableCell>
                <TableCell align="center">Revenue</TableCell>
                <TableCell align="center">Commission</TableCell>
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
                  <TableCell align="left" component="th" scope="row">
                    {content.purchaseType}
                  </TableCell>
                  <TableCell align="center">{content.revenue}</TableCell>
                  <TableCell align="center">{content.commission}</TableCell>
                  <TableCell align="center">{content.purchaseCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreatorProfile;
