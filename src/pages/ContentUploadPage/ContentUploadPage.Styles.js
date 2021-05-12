import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "48px",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "4px",
  },

  formContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    },
  },

  contentTitleWithDescriptionContainer: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "16px",
  },

  purchaseTypeContainer: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "16px",
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

  genreContainer: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "4px",
    // backgroundColor: "rgba(0,0,0,0.04)",
    minHeight: "160px",
  },

  genreBtn: {
    padding: "4px",
    margin: "8px 8px 0px 0px",
    fontSize: "8px",

    "& svg": {
      fontSize: "12px",
    },
  },

  castContainer: {
    position: "relative",
    borderRadius: "4px",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    // backgroundColor: "rgba(0,0,0,0.04)",
  },

  castRemoveBtnContainer: {
    position: "absolute",
    zIndex: 1,
    top: "-12px",
    left: "-12px",

    "& .MuiIconButton-root:hover": {
      backgroundColor: theme.palette.primary.main,
    },

    "& .MuiIconButton-root": {
      padding: "4px",
      backgroundColor: theme.palette.primary.main,
    },
  },

  castRemoveBtn: {},
  castRemoveIcon: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },

  castAddBtn: {
    padding: "4px",
    fontSize: "8px",

    "& svg": {
      fontSize: "12px",
    },
  },
}));

export default useStyles;
