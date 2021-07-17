import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
import AdSense from "react-adsense";
import HomeCarousel from "../../components/HomeCarousel";
import MovieCard from "../../components/MovieCard";
import useGetApi from "../../hooks/useGetApi";
import { getContents, getAllSeries } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import { useHistory } from "react-router";
import {
  transformGetContents,
  transformGetAllSeries,
} from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";
import { CAROUSEL_ADS, getRandomAd } from "../../configs/ads";

function HomePage() {
  const history = useHistory();
  const getContentsParams = useMemo(() => [], []);

  getRandomAd();

  const [carouselCards, setCarouselCards] = useState();

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerApi: contentsTriggerApi,
  } = useGetApi(getContents, getContentsParams, transformGetContents);

  const getAllSeriesParams = useMemo(() => [], []);
  const {
    data: seriesSeasonsData,
    loading: seriesSeasonsLoading,
    error: seriesSeasonsError,
    triggerApi: seriesSeasonsTriggerApi,
  } = useGetApi(getAllSeries, getAllSeriesParams, transformGetAllSeries);

  const handleCardClick = (contentID) =>
    history.push(`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${contentID}`);

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

  useEffect(() => seriesSeasonsTriggerApi(), [seriesSeasonsTriggerApi]);

  useEffect(() => {
    if (contentsData) {
      const contentArray = [
        ...contentsData.contents
          ?.filter((content) => content.isAvailable)
          .map((content) => ({
            ...content,
            url: `${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${content.id}`,
          }))
          .slice(0, 3),
        ...contentsData.series
          ?.filter((content) => content.isAvailable)
          .slice(0, 3)
          .map((content) => ({
            ...content,
            url: `${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${content.startContentId}`,
          })),
      ];

      let altMergedArray = [];

      const minArrLength = Math.min(contentArray.length, CAROUSEL_ADS.length);
      for (let index = 0; index < minArrLength; index += 1) {
        altMergedArray.push(CAROUSEL_ADS[index]);
        altMergedArray.push(contentArray[index]);
      }

      altMergedArray = [
        ...altMergedArray,
        ...CAROUSEL_ADS.slice(minArrLength),
        ...contentArray.slice(minArrLength),
      ];

      setCarouselCards(altMergedArray);
    }
  }, [contentsData]);

  if (contentsLoading || seriesSeasonsLoading) return <PageLoader />;

  if (contentsError || seriesSeasonsError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  if (!contentsData) return <></>;

  return (
    <>
      <Box>{carouselCards && <HomeCarousel contents={carouselCards} />}</Box>

      <Container maxWidth="lg">
        <Box>
          <AdSense.Google
            client="ca-pub-7785498935820458"
            slot="5422295337"
            style={{ display: "block" }}
            format="fluid"
          />
        </Box>
      </Container>

      <span id="ezoic-pub-video-placeholder-1" />

      <Container maxWidth="lg">
        <Box py={4}>
          <Box py={1}>
            <Box py={2}>
              <Typography variant="h4">Recommended</Typography>
            </Box>
            <Grid container spacing={4}>
              {contentsData?.contents
                ?.filter((content) => content.isAvailable)
                .map((contentCard, index) => (
                  <Grid
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    item
                    key={`content-card-${index}`}
                  >
                    <MovieCard
                      cardData={contentCard}
                      onClick={handleCardClick}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {seriesSeasonsData?.length > 0 && (
            <Box py={1}>
              <Box py={2}>
                <Typography variant="h4">Series</Typography>
              </Box>
              <Grid container spacing={4}>
                {seriesSeasonsData
                  .map((series) => series.seasons)
                  .map((season, i) => (
                    <Fragment key={i}>
                      {season
                        ?.filter((contentCard) => contentCard.isAvailable)
                        .map((contentCard, index) => (
                          <Grid
                            lg={3}
                            md={3}
                            sm={6}
                            xs={12}
                            item
                            key={`content-card-${index}`}
                          >
                            <MovieCard
                              cardData={contentCard}
                              onClick={handleCardClick}
                            />
                          </Grid>
                        ))}
                    </Fragment>
                  ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
