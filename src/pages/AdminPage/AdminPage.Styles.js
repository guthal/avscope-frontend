import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
