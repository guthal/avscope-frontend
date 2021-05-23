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
import usePostApi from "../../hooks/usePostApi";
import { transformPostGetContentsRevenue } from "../../utils/api-transforms";
import { postGetContentsRevenue } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";

function CreatorProfile() {
  const { userId } = useContext(AuthContext);

  const postGetContentsRevenueParams = useMemo(() => [userId], [userId]);
  const {
    data: contentRevenueData,
    loading: contentRevenueLoading,
    error: contentRevenueError,
    triggerPostApi: contentRevenueTriggerApi,
  } = usePostApi(
    postGetContentsRevenue,
    postGetContentsRevenueParams,
    transformPostGetContentsRevenue
  );

  const [selectedFromDate, setSelectedFromDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedToDate, setSelectedToDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleFromDateChange = (date) => setSelectedFromDate(date);

  const handleToDateChange = (date) => setSelectedToDate(date);

  useEffect(() => {
    if (userId) {
      console.log("Triggered API");
      contentRevenueTriggerApi({
        fromDate: selectedFromDate,
        toDate: selectedToDate,
      });
    }
  }, [contentRevenueTriggerApi, selectedFromDate, selectedToDate, userId]);

  if (contentRevenueLoading) return <PageLoader />;

  return (
    <Box>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="from-date-picker-inline"
              label="From"
              value={selectedFromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change from date",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="to-date-picker-inline"
              label="To"
              value={selectedToDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change to date",
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. no</TableCell>
            <TableCell align="left">Content title</TableCell>
            <TableCell align="center">Revenue</TableCell>
            <TableCell align="center">Commission</TableCell>
            <TableCell align="center">No. of purchases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentRevenueData?.map((content, index) => (
            <TableRow key={`${content.contentTitle}-${index}`}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {content.contentTitle}
              </TableCell>
              <TableCell align="center">{content.revenue}</TableCell>
              <TableCell align="center">{content.commission}</TableCell>
              <TableCell align="center">{content.purchaseCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default CreatorProfile;
