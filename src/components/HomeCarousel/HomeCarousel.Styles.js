import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  slidercontainer: {},
  imageContainer: {
    height: "500px",
    backgroundColor: theme.palette.primary.main,
    position: "relative",

    "& >img": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "auto",
    },

    [theme.breakpoints.down("sm")]: {
      "& >img": {
        // width: "100%",
        height: "100%",
      },
    },
  },
}));

export default useStyles;
