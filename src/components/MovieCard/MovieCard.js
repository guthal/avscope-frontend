import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { getEllipsedText } from "../../utils/generic";
import MoviePosterCard from "./MoviePosterCard";
import useStyles from "./MovieCard.Styles";
import ContentCard from "../ContentCard";

function MovieCard({ cardData, onClick }) {
  const classes = useStyles();

  const handleCardClick = cardId => onClick?.(cardId);

  return (
    <Box
      className={classes.contentCardContainer}
      onClick={() => handleCardClick(cardData.id)}
    >
      <ContentCard>
        <MoviePosterCard url={cardData.imageUrl} />

        <Box p={2}>
          <Box>
            <Typography variant="h6" color="secondary">
              {cardData.name}
            </Typography>
          </Box>
          {cardData.seasonNo && (
            <Box>
              <Button
                className={classes.seasonBtn}
                color="secondary"
                variant="outlined"
              >
                {`Season ${cardData.seasonNo}`}
              </Button>
            </Box>
          )}
          <Box my={1}>
            <Typography variant="subtitle2">
              {getEllipsedText(cardData.description, 100)}
            </Typography>
          </Box>
        </Box>
      </ContentCard>
    </Box>
  );
}

export default MovieCard;
