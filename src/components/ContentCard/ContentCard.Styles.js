import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    borderRadius: "3px",
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `1px 1px 5px 1px ${theme.palette.primary.main}`,
  },
  cardDefaultStyle: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
