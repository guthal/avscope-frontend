import {
  Container,
  Grid,
  Box,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";
import { useHistory } from "react-router";
import React, { useEffect, useMemo } from "react";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useGetApi from "../../hooks/useGetApi";
import { getCreators } from "../../utils/api";
import { transformGetCreators } from "../../utils/api-transforms";
import ContentCard from "../../components/ContentCard";
import useStyles from "./CreatorsPage.Styles";
import { APP_ROUTES } from "../../configs/app";

function CreatorsPage() {
  const history = useHistory();
  const getCreatorsParams = useMemo(() => [], []);

  const classes = useStyles();

  const {
    data: creatorsData,
    loading: creatorsLoading,
    error: creatorsError,
    triggerApi: creatorsTriggerApi,
  } = useGetApi(getCreators, getCreatorsParams, transformGetCreators);

  const handleUserClick = userID => {
    history.push(`${APP_ROUTES.CONTENT_UPLOAD.path}/${userID}`);
  };

  const handlePayoutClick = userID => {
    history.push(`${APP_ROUTES.CREATOR_PAYOUT.path}/${userID}`);
  };

  useEffect(() => creatorsTriggerApi(), [creatorsTriggerApi]);

  if (creatorsLoading) return <PageLoader />;

  if (creatorsError)
    return (
      <PageError message="Oops.. Something went wrong while fetching contents." />
    );

  return (
    <Container maxWidth="lg">
      {creatorsData && (
        <Box mt={4} mb={2}>
          <Typography variant="h3">
            {creatorsData.length > 0 ? "Creators" : "No Creators Available"}
          </Typography>
        </Box>
      )}
      <Box py={2}>
        <Grid container spacing={4}>
          {creatorsData?.map(creator => (
            <Grid
              key={`creator-${creator.id}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ContentCard>
                <Box p={1}>
                  <Grid container style={{ borderBottom: "1px solid yellow" }}>
                    <Grid item xs={4}>
                      <Box m="auto">
                        <AccountBox className={classes.userAvatar} />
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>
                        <Typography variant="h5" color="secondary">
                          {creator.name}
                        </Typography>
                        {creator?.phone && (
                          <Box>
                            <Typography variant="subtitle2">
                              <Link
                                color="textPrimary"
                                href={`tel:${creator.phone}`}
                              >
                                {creator.phone}
                              </Link>
                            </Typography>
                          </Box>
                        )}
                        {creator?.email && (
                          <Box>
                            <Typography variant="subtitle2">
                              <Link
                                color="textPrimary"
                                href={`mailto: ${creator.email}`}
                              >
                                {creator.email}
                              </Link>
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={4} justify="flex-start">
                    <Grid item xs={5}>
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.linkBtn}
                        onClick={() => handleUserClick(creator.id)}
                      >
                        Upload
                      </Button>
                    </Grid>
                    <Grid item xs={5}>
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.linkBtn}
                        onClick={() => handlePayoutClick(creator.id)}
                      >
                        Payout
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </ContentCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default CreatorsPage;
