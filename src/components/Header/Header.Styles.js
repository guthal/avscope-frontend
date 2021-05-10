import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

export default useStyles;
