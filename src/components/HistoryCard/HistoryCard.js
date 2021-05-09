import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import useStyles from "./HistoryCard.Styles";
import expired from "../../assets/expired.png";
import valid from "../../assets/valid.png";
import { trimDatetoHumanReadable } from "../../utils/generic";
import CountdownTimer from "../CountdownTimer";

function HistoryCard({ historyCard }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                className={classes.historyCardContainer}
            >
                <Grid item className={classes.imageGrid}>
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
                            <Box p={2} style={{ position: "absolute" }}>
                                <Typography gutterBottom variant="h5">
                                    {historyCard.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {trimDatetoHumanReadable(
                                        historyCard.purchaseDate.toString()
                                    )}
                                </Typography>
                                <Typography variant="subtitle2">
                                    $19.00{" "}
                                    {historyCard.isTicketValid && (
                                        <CountdownTimer />
                                    )}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Box className={classes.validityContainer}>
                        {historyCard.isTicketValid ? (
                            <img
                                className={classes.validImg}
                                src={valid}
                                alt="ticket"
                            />
                        ) : (
                            <img
                                className={classes.validImg}
                                src={expired}
                                alt="ticket"
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default HistoryCard;
