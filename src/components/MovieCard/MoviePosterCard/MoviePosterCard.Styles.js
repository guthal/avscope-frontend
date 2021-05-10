import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  posterContainer: {
    position: "relative",
  },

  cardMedia: {
    height: "150px",
  },

  cardMediaHover: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "150px",
    top: "0",
    zIndex: 1,
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}));

export default useStyles;
