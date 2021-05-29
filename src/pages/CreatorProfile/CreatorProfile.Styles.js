import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
  },
  dateGridContainer: {
    padding: "8px",
    margin: "0px 16px",
  },
  calendar: {
    "& label": {
      color: theme.palette.secondary.light,
    },
    "& svg": {
      color: theme.palette.secondary.light,
    },
  },
  table: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: "12px",
  },
  head: {
    backgroundColor: theme.palette.primary.dark,
    "& th": {
      fontSize: "20px !important",
    },
  },
  body: {
    backgroundColor: theme.palette.primary.light,
  },
  /**
   * Trying css here instead of index.css
   */
  // "& .MuiPickersBasePicker-container": {
  //   backgroundColor: "#444 !important",
  // },
  // "& .MuiPickersCalendarHeader-iconButton": {
  //   backgroundColor: "#888 !important",
  // },
  // "& .MuiPickersCalendarHeader-dayLabel": {
  //   color: "#fff !important",
  // },
  // "& .MuiPickersDay-current": {
  //   color: "#f5ec4c !important",
  // },
}));

export default useStyles;
