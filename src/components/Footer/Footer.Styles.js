import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  footerContainer: {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default useStyles;
