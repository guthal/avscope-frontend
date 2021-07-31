import { makeStyles } from "@material-ui/core/styles";
import "../../fonts/fonts.css";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  posterContainer: {
    position: "relative",
    minHeight: "60vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",

    "& >img": {
      position: "absolute",
      right: "0px",
      top: "0px",
      zIndex: -1,
      height: "100%",
      "-webkit-mask-image":
        "radial-gradient(at 65% 50%, black, transparent 72%)",
      maskImage: "radial-gradient(at 65% 50%, black, transparent 72%)",
    },
  },

  certificateContainer: {
    fontFamily: "MateSC",
    fontSize: "16px",
    fontWeight: "bold",
    borderRight: `1px solid ${theme.palette.secondary.dark}`,
    paddingRight: "12px",
  },

  certificateElement: {
    display: "inline",
    padding: "6px",
    border: `2px solid ${theme.palette.secondary.dark}`,
    borderRadius: "4px",
  },

  seasonSelectorContainer: { position: "relative" },

  seasonSelectorDropdown: {
    position: "absolute",
    zIndex: 1,
    top: "0px",
  },
  seasonSelectorItem: {
    width: "130px",
    borderRadius: "0",
    textAlign: "left",
    paddingLeft: "0px",
  },
  watchlistBtn: {
    width: "300px",
  },
  genreBtn: {
    fontSize: "8px",
    padding: "2px 4px",
  },
  purchaseBtn: {
    marginTop: "16px",
    textTransform: "initial",
    fontWeight: "bold",
  },
  playBtn: {
    textTransform: "initial",
    fontWeight: "bold",
    fontSize: "20px",
  },
  ageRestrictedBtn: {
    color: theme.palette.warning.dark,
    textTransform: "initial",
    fontWeight: "bold",
    fontSize: "20px",
    "&:hover": {
      cursor: "not-allowed",
      color: theme.palette.warning.dark,
    },
  },

  platBtnIcon: {
    fontSize: 40,
  },

  adContainer: {
    position: "relative",
    backgroundColor: "black",
    height: "100%",
    "& img": {
      width: "100%",
      height: "auto",
    },
  },

  adSponsor: {
    position: "absolute",
    zIndex: 1,
    fontSize: "10px",
    padding: "2px 8px",
    margin: theme.spacing(1),
    minHeight: 0,
    minWidth: 0,
    fontWeight: "bold",
    textTransform: "initial",
  },

  adPoster: {
    position: "absolute",
    width: "20vw",

    [theme.breakpoints.down("sm")]: {
      width: "40vw",
      top: 0,
    },

    zIndex: 1,
    "& img": {
      width: "100%",
      height: "auto",
    },
  },
}));

export default useStyles;
