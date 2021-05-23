import React, { useContext, useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  CardMedia,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useGetApi from "../../hooks/useGetApi";
import ContentCard from "../../components/ContentCard";
import { transformGetWatchlist } from "../../utils/api-transforms";
import useStyles from "./WatchListPage.Styles";
import { getWatchListData, deleteRemoveFromWatchlist } from "../../utils/api";
import AuthContext from "../../contexts/AuthContext";

function WatchListPage() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const { userWatchlistData } = useContext(AuthContext);

  const getWatchlistDataParams = useMemo(
    () => [params.userID],
    [params.userID]
  );

  const {
    data: watchlistData,
    loading: watchlistLoading,
    error: watchlistError,
    triggerApi: watchlistTriggerApi,
  } = useGetApi(
    getWatchListData,
    getWatchlistDataParams,
    transformGetWatchlist
  );

  const handleRemovefromWatchlist = contentId => {
    deleteRemoveFromWatchlist(params.userID, contentId);
  };

  useEffect(() => {}, [userWatchlistData]);

  useEffect(() => watchlistTriggerApi(), [watchlistTriggerApi]);

  if (watchlistLoading) return <PageLoader />;

  if (watchlistError)
    return (
      <PageError message="Oops.. Something went wrong while loading Watchlist." />
    );

  return (
    <Container maxWidth="lg">
      <Box py={2}>
        <Box p={3}>
          <Typography variant="h3" className={classes.heading}>
            Your Watchlist
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {watchlistData?.map((watchlistContent, index) => (
            <Box key={index}>
              <Box p={2}>
                <Grid item xs={12}>
                  <ContentCard>
                    <Button
                      className={classes.removeBtn}
                      onClick={() => {
                        handleRemovefromWatchlist(watchlistContent.contentId);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    <Box className={classes.mediaContainer}>
                      <CardMedia
                        className={classes.media}
                        image={watchlistContent.thumbnail}
                      />
                      <Box>
                        <Typography variant="h6" color="secondary">
                          {watchlistContent.contentTitle}
                        </Typography>
                      </Box>
                    </Box>
                  </ContentCard>
                </Grid>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default WatchListPage;
