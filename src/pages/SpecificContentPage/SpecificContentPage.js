import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
import MovieCard from "../../components/MovieCard";
import useGetApi from "../../hooks/useGetApi";
import useStyles from "./SpecificContentPage.Styles";
import { getContents, getAllSeries } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import { useHistory, useRouteMatch, useLocation } from "react-router";
import {
  transformGetContents,
  transformGetAllSeries,
} from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";

function SpecificContentPage() {
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;

  const { state } = useLocation();
  const search = state?.search;

  useEffect(() => {
    console.log("Search: ", search);
  }, [search]);

  const classes = useStyles();

  const [contentType, setContentType] = useState([]);

  const getContentsParams = useMemo(() => [contentType], [contentType]);

  const {
    data: specificContentsData,
    loading: specificContentsLoading,
    error: specificContentsError,
    triggerApi: specificContentsTriggerApi,
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

  useEffect(() => {
    if (params.contentType === "all") {
      setContentType(["br", "b", "r", "w"]);
    } else if (params.contentType === "br") {
      setContentType(["br", "b", "r"]);
    } else if (params.contentType === "week") {
      setContentType(["w"]);
    }
  }, [params.contentType]);

  useEffect(
    () => specificContentsTriggerApi(),
    [specificContentsTriggerApi, contentType]
  );

  useEffect(
    () => seriesSeasonsTriggerApi(),
    [seriesSeasonsTriggerApi, contentType]
  );

  if (specificContentsLoading || seriesSeasonsLoading) return <PageLoader />;

  if (specificContentsError || seriesSeasonsError)
    return (
      <PageError message="Oops.. Something went wrong while fetching contents." />
    );

  if (!specificContentsData) return <></>;

  return (
    <Box>
      <Container maxWidth="lg">
        <Box py={4}>
          <Box py={1}>
            <Box py={2}>
              {params.contentType === "week" && (
                <Typography variant="h4">Browse Weekly Contents</Typography>
              )}
              {params.contentType === "br" && (
                <Typography variant="h4">Browse Buy/Rent Contents</Typography>
              )}
              {params.contentType === "all" && (
                <Typography variant="h4">Browse Complete Catalogue</Typography>
              )}
            </Box>
            <Grid container spacing={4}>
              {specificContentsData?.contents
                ?.filter(
                  content =>
                    content.isAvailable &&
                    contentType.includes(content.purchaseType)
                )
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
                  .map(season => (
                    <>
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
                    </>
                  ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default SpecificContentPage;
