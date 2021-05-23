import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  heading: {
    backgroundColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  contentCardContainer: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
  },
  removeBtn: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    borderRadius: 0,
  },
  mediaContainer: {
    height: "180px",
    width: "320px",
    textAlign: "center",
  },
  media: {
    height: "100%",
  },
}));

export default useStyles;
