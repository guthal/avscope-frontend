import React from "react";
import { Box, Container } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useStyles from "./HomeCarousel.Styles";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function HomeCarousel({ contents }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.sliderContainer}>
      <Slider {...settings}>
        {contents.map((content, index) => (
          <Box
            p={1}
            className={classes.imageContainer}
            key={`carousel-${index}`}
          >
            <img src={content.carouselUrl} alt="No Carousel" />
          </Box>
        ))}
      </Slider>
    </Container>
  );
}

export default HomeCarousel;
