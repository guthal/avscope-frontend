import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "10vh 0 0 0",
    padding: 0,
    position: "absolute",
    left: 0,
    top: "100%",
    right: 0,
    backgroundColor: theme.palette.primary.main,
  },
  footerContainer: {
    padding: "16px",
  },
  title: {
    width: "200px",
    padding: "18px 0px",

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
    },
  },
  facebook: {
    "&:hover": {
      color: "#4267B2",
    },
  },
  twitter: {
    "&:hover": {
      color: "#1DA1F2",
    },
  },
  instagram: {
    "&:hover": {
      color: "#E1306C",
    },
  },
  whatsapp: {
    "&:hover": {
      color: "#25D366",
    },
  },
}));

export default useStyles;
