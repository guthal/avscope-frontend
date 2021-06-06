import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
  expired: {
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  expiredImage: {
    width: "50%",
  },
  textField: {
    width: "100%",

    "& input, textarea": {
      color: theme.palette.primary.main,
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

export default useStyles;
