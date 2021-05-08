import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import useStyles from "./HistoryCard.Styles";
import { getEllipsedText } from "../../utils/generic";

function HistoryCard({ historyCard }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item>
                    <Box className={classes.imageContainer}>
                        <img
                            className={classes.img}
                            src={historyCard.posterUrl}
                            alt="variant"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Box p={2}>
                                <Typography gutterBottom variant="subtitle1">
                                    {historyCard.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {getEllipsedText(
                                        historyCard.description,
                                        30
                                    )}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    $19.00
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default HistoryCard;
