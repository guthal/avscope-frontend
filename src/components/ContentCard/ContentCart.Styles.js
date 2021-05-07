import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default useStyles;
