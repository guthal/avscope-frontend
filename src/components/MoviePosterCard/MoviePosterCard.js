import React, { useState } from "react";
import { CardMedia, CardActionArea, Box } from "@material-ui/core";
import { PlayCircleFilledRounded } from "@material-ui/icons";
import useStyles from "./MoviePosterCard.Styles";

function MoviePosterCard({ url, onPosterClick }) {
  const classes = useStyles();

  const [isCardHighlighted, setIsCardHighlighted] = useState(false);

  const handleMouseHover = () => setIsCardHighlighted((prev) => !prev);

  const handlePosterClick = () => onPosterClick?.();

  return (
    <Box className={classes.posterContainer}>
      <CardActionArea
        className={classes.cardContainer}
        onMouseEnter={handleMouseHover}
      >
        <CardMedia image={url} className={classes.cardMedia} />
      </CardActionArea>
      {isCardHighlighted && (
        <Box
          className={classes.cardMediaHover}
          onClick={handlePosterClick}
          onMouseLeave={handleMouseHover}
        >
          <PlayCircleFilledRounded />
        </Box>
      )}
    </Box>
  );
}

export default MoviePosterCard;
