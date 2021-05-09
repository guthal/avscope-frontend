import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  posterContainer: {
    position: "relative",
    width: "100%",
    height: "60vh",
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
        "radial-gradient(at 65% 50%, black, transparent 70%)",
      maskImage: "radial-gradient(at 65% 50%, black, transparent 70%)",
    },
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
