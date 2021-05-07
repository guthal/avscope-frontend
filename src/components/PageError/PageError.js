import { Typography, Container, Grid } from "@material-ui/core";
import React from "react";
import useStyles from "./PageError.Styles";

function PageError(message) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Typography variant="h2">
            {"Something went wrong while loading this page.."}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageError;
