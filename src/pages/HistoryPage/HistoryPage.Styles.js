import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "50vh",
  },
  heading: {
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  contentCardContainer: {
    height: "100%",
    cursor: "pointer",
  },
}));

export default useStyles;
