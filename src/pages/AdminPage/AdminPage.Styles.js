import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "50vh",
  },
  cardContainer: {
    cursor: "pointer",
  },
  cardIcon: {
    fontSize: 100,
    color: theme.palette.secondary.main,
  },
  cardText: {
    wordBreak: "break-word",
  },
}));

export default useStyles;
