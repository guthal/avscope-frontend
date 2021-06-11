import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  searchRoot: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    height: "50px",
    width: "300px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "12px",
  },
  search: {
    position: "absolute",
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

export default useStyles;
