import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import ContentCard from "../../components/ContentCard";
import HomeCarousel from "../../components/HomeCarousel";
import useGetContents from "../../hooks/useGetApi";
import { getContents } from "../../utils/api";

function HomePage() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => setClickCount((count) => count + 1);

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerApi: contentsTriggerApi,
  } = useGetContents(getContents());

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

  if (contentsLoading)
    return (
      <Container>
        <Box component="span" m="auto">
          <CircularProgress />
        </Box>
      </Container>
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
                  <Typography variant="body">
                    - "{contentCard.contentDescription}
                  </Typography>
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
