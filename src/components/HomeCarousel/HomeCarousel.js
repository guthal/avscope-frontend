import React from "react";
import { Box } from "@material-ui/core";
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

function HomeCarousel() {
  const classes = useStyles();
  const images = [
    "https://townsquare.media/site/442/files/2020/08/the-batman-logo.jpg?w=980&q=75",
    "https://variety.com/wp-content/uploads/2020/08/batman-first-look.png",
    "https://cdna.artstation.com/p/assets/images/images/020/539/304/large/tyr-s-studio-joker2.jpg?1568171432",
  ];
  return (
    <Box p={2} className={classes.slidercontainer}>
      <Slider {...settings}>
        {images.map((image) => (
          <Box p={1} className={classes.imageContainer}>
            <img src={image} alt="No Carousel" />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default HomeCarousel;
