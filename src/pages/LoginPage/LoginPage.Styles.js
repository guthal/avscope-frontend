import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
  loginError: {
    color: "red",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    "& input": {
      color: theme.palette.primary.main,
    },
    "& input:hover": {
      border: "none !important",
    },
  },
  iconsContainer: {
    borderTop: `1px solid ${theme.palette.primary.dark}`,
    padding: "16px",
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "12px",
    margin: "10px 0px",
    padding: "5px 0px",
  },
  googleIcon: {
    width: "30px",
    height: "30px",
    margin: "0px 10px",
  },
  facebookIcon: {
    color: "#4267B2",
    width: "30px",
    height: "30px",
    margin: "0px 10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
