import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  logoContainer: {
    cursor: "pointer",
    flexGrow: 1,
  },
  title: {
    textTransform: "uppercase",
  },
  profileContainer: {
    position: "relative",
  },
  profileMenu: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    width: "150px",
    padding: "8px",
    backgroundColor: theme.palette.primary.main,
  },
  profileMenuItem: {
    border: "none",
    width: "100%",
  },
}));

export default useStyles;
