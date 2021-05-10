import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
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
        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.imageGrid}>
          <Box className={classes.imageContainer}>
            <img src={cardData.posterUrl} alt="variant" />
          </Box>
        </Grid>
        <Grid item xs={12} md container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Box px={2}>
                <Typography gutterBottom variant="h5">
                  {cardData.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {trimDatetoHumanReadable(cardData.purchaseDate.toString())}
                </Typography>
                <Typography variant="h6">₹ {cardData.purchasePrice}</Typography>
                <Typography variant="button">
                  <b>{cardData.isTicketValid && " Expires in: "}</b>
                  {cardData.isTicketValid && (
                    <CountdownTimer
                      onComplete={handleComplete}
                      purchaseDate={cardData.purchaseDate}
                    />
                  )}
                </Typography>
                {!cardData.isTicketValid &&
                  (cardData.purchaseType === "r" ? (
                    <Button variant="contained" color="secondary">
                      Rent Again
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary">
                      Buy Weekly Again
                    </Button>
                  ))}
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
