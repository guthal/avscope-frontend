import React, { useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import ContentCard from "../../components/ContentCard";

function HomePage() {
  const [clickCount, setClickCount] = useState(0);

  const dummyCards = {
    title: "Card",
    description: "Description for Card",
  };

  const handleClick = () => setClickCount((count) => count + 1);

  return (
    <Container maxWidth="xl">
      <Box py={2}>
        <Typography variant="h5">{`Cards have been clicked ${clickCount} time(s)`}</Typography>
      </Box>
      <Grid container spacing={4}>
        {Array(10)
          .fill(dummyCards)
          .map((dummyCard, index) => (
            <Grid item>
              <ContentCard>
                <Box mx="auto">
                  <Typography variant="h3">{`${dummyCard.title}-${index}`}</Typography>
                </Box>
                <Box my={1}>
                  <Typography>{`${dummyCard.description}-${index}`}</Typography>
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
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
