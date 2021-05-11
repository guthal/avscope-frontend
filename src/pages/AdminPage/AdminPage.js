import React from "react";
import { Container, Grid, Box, Typography } from "@material-ui/core";
import { Videocam, PersonAdd } from "@material-ui/icons";
import ContentCard from "../../components/ContentCard";
import useStyles from "./AdminPage.Styles";
import { useHistory } from "react-router";
import { APP_ROUTES } from "../../configs/app";

function AdminPage() {
  const classes = useStyles();
  const history = useHistory();

  const handleCreatorCardClick = () =>
    history.push(APP_ROUTES.CREATORS_PAGE.path);
  return (
    <Container maxWidth="lg">
      <Box my={5}>
        <Box my={5}>
          <Typography variant="h3">Admin Panel</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={3}>
            <ContentCard>
              <Box
                p={2}
                onClick={handleCreatorCardClick}
                className={classes.cardContainer}
              >
                <Box className={classes.cardIconContainer}>
                  <Videocam className={classes.cardIcon} />
                </Box>
                <Box>
                  <Typography
                    color="secondary"
                    className={classes.cardText}
                    variant="h5"
                  >
                    View Creators
                  </Typography>
                </Box>
              </Box>
            </ContentCard>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <ContentCard>
              <Box
                p={2}
                // onClick={handleCreatorCardClick}
                className={classes.cardContainer}
              >
                <Box className={classes.cardIconContainer}>
                  <PersonAdd className={classes.cardIcon} />
                </Box>
                <Box>
                  <Typography
                    color="secondary"
                    className={classes.cardText}
                    variant="h5"
                  >
                    Add New Creator
                  </Typography>
                </Box>
              </Box>
            </ContentCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AdminPage;
