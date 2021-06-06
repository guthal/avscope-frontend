import { fade, makeStyles } from "@material-ui/core/styles";

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
  dflex: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: "8px",
    height: "100%",
    position: "absolute",
    color: theme.palette.secondary.light,
    zIndex: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    backgroundColor: theme.palette.primary.main,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default useStyles;
