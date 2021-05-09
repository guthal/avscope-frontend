import React, { useState } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import useStyles from "./HistoryCard.Styles";
import expired from "../../assets/expired.png";
import valid from "../../assets/valid.png";
import { trimDatetoHumanReadable } from "../../utils/generic";
import CountdownTimer from "../CountdownTimer";

function HistoryCard({ historyCard }) {
  const classes = useStyles();
  const [cardData, setCardData] = useState(historyCard);

  const handleComplete = () =>
    setCardData(prev => ({
      ...prev,
      isTicketValid: false,
    }));

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.historyCardContainer}>
        <Grid item className={classes.imageGrid}>
          <Box className={classes.imageContainer}>
            <img src={cardData.posterUrl} alt="variant" />
          </Box>
        </Grid>
        <Grid item xs={12} md container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Box p={2}>
                <Typography gutterBottom variant="h5">
                  {cardData.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {trimDatetoHumanReadable(cardData.purchaseDate.toString())}
                </Typography>
                <Typography variant="subtitle2">
                  $19.00{" "}
                  {cardData.isTicketValid && (
                    <CountdownTimer
                      onComplete={handleComplete}
                      purchaseDate={cardData.purchaseDate}
                    />
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Box style={{ position: "relative" }}>
          <Box className={classes.validityContainer}>
            {cardData.isTicketValid ? (
              <img className={classes.validImg} src={valid} alt="ticket" />
            ) : (
              <img className={classes.validImg} src={expired} alt="ticket" />
            )}
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

export default HistoryCard;
