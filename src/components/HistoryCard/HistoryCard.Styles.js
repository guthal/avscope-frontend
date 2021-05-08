import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    imageContainer: {
        backgroundColor: theme.palette.primary.main,
        position: "relative",
        height: "130px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",

        "& >img": {
            width: "250px",
            height: "auto",
        },

        [theme.breakpoints.down("sm")]: {
            height: "250px",
        },
    },
}));

export default useStyles;
