import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    padding: "24px",

    "& .slick-slider": {
      position: "relative",
    },

    "& .slick-prev": {
      position: "absolute",
      zIndex: 1,
      display: "block",
      left: "25px",
    },

    "& .slick-next": {
      right: "25px",
    },

    "& .slick-next:before, .slick-prev:before": {
      borderRadius: "10px",
      position: "absolute",
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.background.default,
      opacity: 0.7,
      fontWeight: "bolder",
      fontSize: "2rem",
      padding: "16px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .slick-next:before": {
      content: "'>'",
      right: "10px",
    },
    "& .slick-prev:before": {
      left: "10px",
      content: "'<'",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "8px 0",
    },
  },

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
      height: "250px",
    },
  },
}));

export default useStyles;
