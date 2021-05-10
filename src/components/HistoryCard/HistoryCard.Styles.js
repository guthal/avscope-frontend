import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "0px 8px",
    padding: "16px 0px",
  },
  historyCardContainer: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.contrastText,
    boxShadow: `1px 1px 5px 1px ${theme.palette.primary.main}`,
  },
  imageGrid: {
    padding: "0 !important",
  },
  imageContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0px 2px 20px 1px ${theme.palette.primary.main}`,
    height: "100%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",

    "& >img": {
      width: "100%",
      maxHeight: "150px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
  },
  validityContainer: {
    right: 0,
    position: "absolute",
    height: "90px",
    width: "150px",
    zIndex: 2,
    overflow: "hidden",
    opacity: 0.4,
  },
  validImg: {
    width: "100%",
    height: "100%",
  },
}));

export default useStyles;
