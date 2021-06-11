import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appNavBar: {
    height: "auto",
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
  contentTypeLinkDisabled: {
    color: theme.palette.secondary.dark,
    fontSize: "18px",
    "&:hover": {
      cursor: "not-allowed",
      textShadow: `0px 0px 5px ${theme.palette.secondary.dark}`,
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
  iconTriggerDisabled: {
    width: "35px",
    height: "35px",
    fill: theme.palette.secondary.main,
    boxShadow: `0px 0px 2px ${theme.palette.secondary.light}`,
    borderRadius: "25%",
    "&:hover": {
      cursor: "not-allowed",
    },
  },
  clubLocked: {
    width: "35px",
    height: "35px",
    padding: "5px",
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
  modal: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  paper: {
    marginTop: "20px",
    padding: "10px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    border: "2px solid #000",
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
  },
  searchModalIcon: {
    padding: "10px",
    color: theme.palette.secondary.main,
  },
  inputModalInput: {
    transition: theme.transitions.create("width"),
    marginTop: "5px",
    width: "100%",
    fontSize: "18px",
    "&:focus": {
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "12px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

export default useStyles;
