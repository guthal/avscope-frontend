import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "100px 0px",
  },
  paper: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: "15px",
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: "12px",
  },
}));

export default useStyles;
