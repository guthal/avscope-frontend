import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  footerContainer: {
    backgroundColor: theme.palette.primary.main,
    padding: "16px",
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    height: "128px",

    "& img": {
      height: "100%",
    },
  },
  footerLinks: {
    fontSize: "15px",
    color: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.light,
      textShadow: `0px 0px 5px ${theme.palette.secondary.light}`,
    },
  },
  footerIcons: {
    width: "30px",
    height: "30px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.light,
    },
  },
}));

export default useStyles;
