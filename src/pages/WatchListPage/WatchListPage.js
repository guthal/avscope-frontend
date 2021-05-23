import React, { useContext, useEffect, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
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
import AuthContext from "../../contexts/AuthContext";
import { getWatchListData, deleteRemoveFromWatchlist } from "../../utils/api";
import { APP_ROUTES } from "../../configs/app";

function WatchListPage() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const { setUserWatchlistData } = useContext(AuthContext);
  const { params } = routeMatch;

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
    deleteRemoveFromWatchlist(params.userID, contentId).then(() => {
      watchlistTriggerApi();
      setUserWatchlistData(prev =>
        prev.filter(watchlistItem => watchlistItem !== contentId)
      );
    });
  };

  const handleContentRedirect = contentId => {
    history.push(`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${contentId}`);
  };

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
                    <Box className={classes.mediaContainer}>
                      <CardMedia
                        className={classes.media}
                        image={watchlistContent.thumbnail}
                        onClick={() => {
                          handleContentRedirect(watchlistContent.contentId);
                        }}
                      />
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          className={classes.removeBtn}
                          color="secondary"
                          onClick={() => {
                            handleRemovefromWatchlist(
                              watchlistContent.contentId
                            );
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                        <Box px={2}>
                          <Typography variant="h6" color="secondary">
                            {watchlistContent.contentTitle}
                          </Typography>
                        </Box>
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
