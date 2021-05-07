import React from "react";
import { Box, Typography, Container, Grid, Button } from "@material-ui/core";
import ContentCard from "../../components/ContentCard";

function HomePage() {
  const dummyCards = {
    title: "Card",
    description: "Description for Card",
  };

  return (
    <Container maxWidth="xl">
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
                  <Button color="secondary" variant="contained">
                    Dummy Button
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
