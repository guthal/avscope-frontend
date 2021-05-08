import React from "react";
import { Box, Container } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useStyles from "./HomeCarousel.Styles";
import { HOME_PAGE } from "../../configs/app";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

function HomeCarousel() {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.sliderContainer}>
            <Slider {...settings}>
                {HOME_PAGE.CAROUSEL_IMAGES.map((image, index) => (
                    <Box
                        p={1}
                        className={classes.imageContainer}
                        key={`carousel-${index}`}
                    >
                        <img src={image} alt="No Carousel" />
                    </Box>
                ))}
            </Slider>
        </Container>
    );
}

export default HomeCarousel;
