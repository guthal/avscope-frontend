import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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

  platBtnIcon: {
    fontSize: 40,
  },
}));

export default useStyles;
