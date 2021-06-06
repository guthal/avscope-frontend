import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  logoLinkContainer: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentTypeLinksContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentTypeLink: {
    color: theme.palette.secondary.main,
    fontSize: "18px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.light,
      textShadow: `0px 0px 5px ${theme.palette.secondary.light}`,
    },
  },
  iconTrigger: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    color: theme.palette.secondary.main,
    boxShadow: `0px 0px 2px ${theme.palette.secondary.light}`,
    borderRadius: "50%",
    "&:hover": {
      boxShadow: `0px 0px 5px ${theme.palette.secondary.light}`,
    },
  },
  title: {
    width: "125px",
    marginTop: "5px",
    cursor: "default",

    "& img": {
      width: "100%",
    },
  },
  profileContainer: {
    position: "relative",
  },
  profileMenu: {
    position: "absolute",
    zIndex: 1,
    right: "-24px",
    width: "150px",
    padding: "8px",
    backgroundColor: theme.palette.primary.main,
  },
  profileMenuItem: {
    border: "none !important",
    width: "100%",
  },
}));

export default useStyles;
