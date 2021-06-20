import React, { Fragment, useEffect, useMemo } from "react";
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

  const handleCardClick = (contentID) =>
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
              ?.filter((content) => content.isAvailable)
              .slice(0, 3),
            ...contentsData?.series
              ?.filter((content) => content.isAvailable)
              .slice(0, 3),
          ]}
        />
      </Box>

      <div style={{ paddingTop: "56.25%", position: "relative" }}>
        <iframe
          title="MOvie"
          src="https://player.vdocipher.com/playerAssets/1.x/vdo/embed/index.html#otp=20160313versASE323x0SHyLySJanUE1i5oEcJoy15UPGckwMqm40YYOsEbf2eyH&playbackInfo=eyJ2aWRlb0lkIjoiNzk0ODY1ZjllMTc4NGFkNjk4YzQwMDE4ZDdjNjY5MzYifQ=="
          style={{
            border: 0,
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allowFullScreen="true"
          allow="encrypted-media"
        />
      </div>

      <Container maxWidth="lg">
        <Box>
          <AdSense.Google
            client="ca-pub-7292810486004926"
            slot="7806394673"
            style={{ display: "block" }}
            layout="in-article"
            format="fluid"
          />
        </Box>
      </Container>

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
