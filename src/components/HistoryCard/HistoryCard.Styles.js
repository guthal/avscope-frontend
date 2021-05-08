import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: "0px 8px",
        padding: "16px 0px",
    },
    historyCardContainer: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.contrastText,
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `1px 1px 5px 1px ${theme.palette.primary.main}`,
    },
    imageGrid: {
        padding: 0,
    },
    imageContainer: {
        backgroundColor: theme.palette.primary.main,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0px 2px 20px 1px ${theme.palette.primary.main}`,
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
            height: "100px",
        },
    },
    validityContainer: {
        position: "relative",
        height: "90px",
        width: "150px",
        zIndex: 2,
        overflow: "hidden",
    },
    validImg: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
}));

export default useStyles;
