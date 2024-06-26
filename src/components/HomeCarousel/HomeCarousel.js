import React from "react";
import { Box, Container, Link, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
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
  autoplay: true,
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
            <Link
              to={content?.isExternalUrl ? undefined : content.url}
              href={content?.isExternalUrl ? content.url : undefined}
              component={content?.isExternalUrl ? undefined : RouterLink}
              target={content?.isExternalUrl ? "_blank" : undefined}
            >
              {content?.isExternalUrl && (
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.adSponsor}
                >
                  Sponsored
                </Button>
              )}
              <img src={content.carouselUrl} alt="No Carousel" />
            </Link>
          </Box>
        ))}
      </Slider>
    </Container>
  );
}

export default HomeCarousel;
