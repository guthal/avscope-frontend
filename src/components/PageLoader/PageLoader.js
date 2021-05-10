import { CircularProgress, Container, Grid } from "@material-ui/core";
import React from "react";
import useStyles from "./PageLoader.Styles";

function PageLoader() {
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
          <CircularProgress color="secondary" size={100} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageLoader;
