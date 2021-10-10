import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  userProfileModalContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileUserName: {
    borderBottom: `2px solid ${theme.palette.secondary.dark}`,
  },
  closeIconContainer: {
    position: "absolute",
    "&:hover": {
      cursor: "pointer",
    },
  },
  closeIcon: {
    color: theme.palette.primary.light,
    fontSize: "2rem",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  userProfileModalBox: {
    width: "450px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
  },
  userProfileItem: {
    width: "350px",
    margin: "5px",
  },
  expandIcon: {
    color: theme.palette.primary.dark,
  },
  accountSettingsAccordion: {
    backgroundColor: theme.palette.background.paper,
  },
  accordionSummary: {
    boxShadow: `0px 0px 1px ${theme.palette.primary.dark}`,
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
      padding: 0,
    },
  },
  accordionDetails: {
    display: "block",
    padding: "0px 8px",
  },
  dateOfBirthUtil: {
    "& button": {
      color: theme.palette.text.secondary,
    },
    "& input": {
      color: theme.palette.text.secondary,
      width: "100px",
    },
  },
  fullWidth: {
    width: "100%",
  },
  dOBAgeUnverifiedBanner: {
    color: "red",
  },
}));

export default useStyles;
