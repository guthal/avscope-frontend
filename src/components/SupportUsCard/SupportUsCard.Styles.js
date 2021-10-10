import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    bottom: "16px",
    zIndex: "0",
  },
  donateBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "16px",
  },
  donateBtn: {
    padding: "0",
    borderRadius: "50%",
  },
  attachMoneyIcon: {
    color: theme.palette.secondary.main,
    fontSize: "30px",
    padding: "5px 0px",
  },
  toolTipHeading: {
    fontSize: "14px",
    fontWeight: 600,
  },
  toolTipDesc: {
    fontSize: "12px",
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.dark,
  },
  icon: {
    fontSize: "40px",
    width: "100%",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  infoIcon: {
    fontSize: "15px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImgContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    textAlign: "center",
  },
  bannerImg: {
    width: "150px",
    padding: "18px 0px",

    "& img": {
      height: "100%",
    },
  },
  modalContainer: {
    marginTop: "-200px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    borderRadius: "12px",
    padding: "0rem 5rem 2rem 5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  textField: {
    "& input": {
      color: theme.palette.primary.main,
    },
    "& input:hover": {
      border: "none !important",
    },
  },
  btn: {
    width: "100%",
  },
}));

export default useStyles;
