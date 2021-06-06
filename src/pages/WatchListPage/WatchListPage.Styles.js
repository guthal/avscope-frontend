import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "50vh",
  },
  heading: {
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  contentCardContainer: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
  },
  mediaContainer: {
    height: "180px",
    width: "320px",
    textAlign: "center",
  },
  media: {
    height: "100%",
    cursor: "pointer",
  },
}));

export default useStyles;
