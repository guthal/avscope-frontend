import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: "15px",
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: "12px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  calendar: {
    padding: 0,
    margin: "0px 8px",
    "& div": {
      color: theme.palette.primary.dark,
    },
  },
  gender: {
    color: theme.palette.primary.dark,
    "& input": {
      color: theme.palette.primary.dark,
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  textField: {
    "& input": {
      color: theme.palette.primary.main,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
