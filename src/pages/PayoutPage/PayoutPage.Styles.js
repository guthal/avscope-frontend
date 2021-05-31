import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dateGridContainer: {
    padding: "8px",
    margin: "0px 16px",
    width: "1020px",
    [theme.breakpoints.down("md")]: {
      width: "720px",
    },
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
    width: "1020px",
    [theme.breakpoints.down("md")]: {
      width: "720px",
    },
  },
  textField: {
    "& input": {
      color: theme.palette.primary.main,
    },
    "& input:hover": {
      border: "none !important",
    },
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
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: "15px",
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: "12px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "150px",
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
