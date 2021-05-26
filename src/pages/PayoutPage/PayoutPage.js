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
import useStyles from "./PayoutPage.Styles";
import usePostApi from "../../hooks/usePostApi";
import { transformPostCreatorPayout } from "../../utils/api-transforms";
import { postCreatorPayout } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";

function PayoutPage() {
  const { userId } = useContext(AuthContext);
  const toDate = new Date(Date.now());
  const fromDate = new Date(toDate);
  const classes = useStyles();

  const postCreatorPayoutParams = useMemo(() => [userId], [userId]);
  const {
    data: creatorPayoutData,
    loading: creatorPayoutLoading,
    // eslint-disable-next-line no-unused-vars
    error: creatorPayoutError,
    triggerPostApi: creatorPayoutTriggerApi,
  } = usePostApi(
    postCreatorPayout,
    postCreatorPayoutParams,
    transformPostCreatorPayout
  );

  const [selectedFromDate, setSelectedFromDate] = useState(
    fromDate.setDate(fromDate.getDate() - 7)
  );
  const [selectedToDate, setSelectedToDate] = useState(toDate);

  const handleFromDateChange = date => setSelectedFromDate(date);

  const handleToDateChange = date => setSelectedToDate(date);

  useEffect(() => {
    if (userId) {
      creatorPayoutTriggerApi({
        fromDate: selectedFromDate,
        toDate: selectedToDate,
      });
    }
  }, [creatorPayoutTriggerApi, selectedFromDate, selectedToDate, userId]);

  if (creatorPayoutLoading) return <PageLoader />;

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
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="to-date-picker-inline"
                label="To"
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
                <TableCell align="center">Revenue</TableCell>
                <TableCell align="center">Commission</TableCell>
                <TableCell align="center">No. of purchases</TableCell>
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

export default PayoutPage;