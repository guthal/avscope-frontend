import React, { Fragment, useEffect, useMemo } from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
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

function HomePage() {
  const history = useHistory();
  const getContentsParams = useMemo(() => [], []);

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

  const handleCardClick = contentID =>
    history.push(`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${contentID}`);

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

  useEffect(() => seriesSeasonsTriggerApi(), [seriesSeasonsTriggerApi]);

  if (contentsLoading || seriesSeasonsLoading) return <PageLoader />;

  if (contentsError || seriesSeasonsError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  if (!contentsData) return <></>;

  return (
    <>
      <Box>
        <HomeCarousel
          contents={[
            ...contentsData?.contents
              ?.filter(content => content.isAvailable)
              .slice(0, 3),
            ...contentsData?.series
              ?.filter(content => content.isAvailable)
              .slice(0, 3),
          ]}
        />
      </Box>

      <Container maxWidth="lg">
        <Box py={4}>
          <Box py={1}>
            <Box py={2}>
              <Typography variant="h4">Recommended</Typography>
            </Box>
            <Grid container spacing={4}>
              {contentsData?.contents
                ?.filter(content => content.isAvailable)
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
                  .map(series => series.seasons)
                  .map((season, i) => (
                    <Fragment key={i}>
                      {season
                        ?.filter(contentCard => contentCard.isAvailable)
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
