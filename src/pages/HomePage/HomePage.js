import React, { useEffect, useMemo } from "react";
import { Box, Typography, Container, Grid } from "@material-ui/core";
import ContentCard from "../../components/ContentCard";
import HomeCarousel from "../../components/HomeCarousel";
import useGetApi from "../../hooks/useGetApi";
import { getContents } from "../../utils/api";
import { getEllipsedText } from "../../utils/generic";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./HomePage.Styles";
import MoviePosterCard from "../../components/MoviePosterCard/MoviePosterCard";
import { useHistory } from "react-router";
import { transformGetContents } from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";

function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const getContentsParams = useMemo(() => ["param1", "param2"], []);

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerApi: contentsTriggerApi,
  } = useGetApi(getContents, getContentsParams, transformGetContents);

  const handleCardClick = (contentID) =>
    history.push(`${APP_ROUTES.CONTENT_PAGE.path}/${contentID}`);

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

  if (contentsLoading) return <PageLoader />;

  if (contentsError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Box>
      <Box>
        <HomeCarousel />
      </Box>

      <Container maxWidth="lg">
        <Box py={5}>
          <Grid container spacing={4}>
            {contentsData?.map((contentCard, index) => (
              <Grid
                lg={3}
                md={3}
                sm={6}
                xs={12}
                item
                key={`content-card-${index}`}
              >
                <Box
                  className={classes.contentCardContainer}
                  onClick={() => handleCardClick(contentCard.id)}
                >
                  <ContentCard>
                    <MoviePosterCard url={contentCard.posterUrl} />

                    <Box p={2}>
                      <Box>
                        <Typography variant="h5">{contentCard.name}</Typography>
                      </Box>
                      <Box my={1}>
                        <Typography variant="subtitle2">
                          {getEllipsedText(contentCard.description, 100)}
                        </Typography>
                      </Box>
                    </Box>
                  </ContentCard>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
