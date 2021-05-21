import React, { useState, useContext } from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import useStyles from "./HistoryCard.Styles";
import expired from "../../assets/expired.png";
import valid from "../../assets/valid.png";
import { trimDatetoHumanReadable } from "../../utils/generic";
import CountdownTimer from "../CountdownTimer";
import { loadRazorPay } from "../../utils/pay";
import AuthContext from "../../contexts/AuthContext";
import TimerIcon from "@material-ui/icons/Timer";

function HistoryCard({ historyCard }) {
  const classes = useStyles();
  const [cardData, setCardData] = useState(historyCard);

  const { userId } = useContext(AuthContext);

  const handleComplete = () =>
    setCardData((prev) => ({
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
                {cardData.purchaseType !== "b" && (
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    {cardData.isTicketValid && <TimerIcon />}
                    <Box px={1} style={{ fontSize: "15px" }}>
                      {cardData.isTicketValid && (
                        <CountdownTimer
                          onComplete={handleComplete}
                          expiryDate={cardData.expiryDate}
                        />
                      )}
                    </Box>
                  </Box>
                )}
                {!cardData.isTicketValid && cardData.purchaseType === "r" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      loadRazorPay(
                        event,
                        userId,
                        cardData.purchasePrice,
                        cardData.contentId,
                        cardData.purchaseType
                      );
                    }}
                  >
                    Rent Again
                  </Button>
                )}
                {!cardData.isTicketValid && cardData.purchaseType === "w" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      loadRazorPay(
                        event,
                        userId,
                        cardData.purchasePrice,
                        cardData.contentId,
                        cardData.purchaseType
                      );
                    }}
                  >
                    Buy Weekly Again
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {cardData.purchaseType !== "b" && (
          <Box style={{ position: "relative" }}>
            <Box className={classes.validityContainer}>
              {cardData.isTicketValid ? (
                <img className={classes.validImg} src={valid} alt="ticket" />
              ) : (
                <img className={classes.validImg} src={expired} alt="ticket" />
              )}
            </Box>
          </Box>
        )}
      </Grid>
    </div>
  );
}

export default HistoryCard;
