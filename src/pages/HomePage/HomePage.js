import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import ContentCard from "../../components/ContentCard";
import HomeCarousel from "../../components/HomeCarousel";
import useGetApi from "../../hooks/useGetApi";
import { getContents } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";

function HomePage() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => setClickCount((count) => count + 1);

  const getContentsParams = useMemo(() => ["param1", "param2"], []);

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerApi: contentsTriggerApi,
  } = useGetApi(getContents, getContentsParams);

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

  if (contentsLoading) return <PageLoader />;

  if (contentsError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Container maxWidth="lg">
      <Box>
        <HomeCarousel />
      </Box>
      <Box py={2}>
        <Typography variant="h5">{`Cards have been clicked ${clickCount} time(s)`}</Typography>
      </Box>
      <Grid container spacing={4}>
        {contentsData?.map((contentCard, index) => (
          <Grid lg={3} md={3} sm={6} xs={12} item key={`content-card-${index}`}>
            <Box m="auto">
              <ContentCard>
                <Box mx="auto">
                  <Typography variant="h3">
                    {contentCard.contentName}
                  </Typography>
                </Box>
                <Box my={1}>
                  <Typography>- "{contentCard.contentDescription}</Typography>
                </Box>

                <Box>
                  <Typography align="right" variant="subtitle2">
                    - {contentCard.contentStar}
                  </Typography>
                </Box>
                <Box my={3}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClick}
                  >
                    Click me
                  </Button>
                </Box>
              </ContentCard>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
