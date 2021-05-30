import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  ClickAwayListener,
} from "@material-ui/core";
import { PlayCircleOutlineOutlined, ArrowDropDown } from "@material-ui/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import React, { useMemo, useEffect, useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import MovieCard from "../../components/MovieCard";
import useGetApi from "../../hooks/useGetApi";
import {
  getContent,
  getContents,
  getSeriesContents,
  getUserContentPurchases,
  postAddWatchList,
  deleteRemoveFromWatchlist,
} from "../../utils/api";
import {
  transformGetContent,
  transformGetContents,
  transformGetSeriesContents,
  transformGetUserContentPurchase,
} from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./VideoDetailPage.Styles";
import { loadRazorPay } from "../../utils/pay";

const PurchaseButton = ({ btnText, onClick }) => {
  const classes = useStyles();

  return (
    <Box component="span" pr={2}>
      <Button
        color="secondary"
        variant="contained"
        onClick={onClick}
        className={classes.purchaseBtn}
      >
        {btnText}
      </Button>
    </Box>
  );
};

function VideoDetailPage() {
  const classes = useStyles();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const { userId, userWatchlistData, setUserWatchlistData } =
    useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const [recommendedContents, setRecommendedContents] = useState();
  const [seriesContents, setSeriesContents] = useState();
  const [seasonSelectorOpen, setSeasonSelectorOpen] = useState(false);

  const getContentParams = useMemo(
    () => [params.contentID],
    [params.contentID]
  );
  const {
    data: contentData,
    loading: contentLoading,
    error: contentError,
    triggerApi: contentTriggerApi,
  } = useGetApi(getContent, getContentParams, transformGetContent);

  const getContentsParams = useMemo(() => [], []);
  const {
    data: contentsData,
    loading: contentsLoading,
    triggerApi: contentsTriggerApi,
  } = useGetApi(getContents, getContentsParams, transformGetContents);

  const getUserContentPurchasesParams = useMemo(
    () =>
      contentData
        ? [userId, contentData.seriesInfo?.seasonId || contentData.id]
        : [],
    [contentData, userId]
  );
  const {
    data: userContentPurchaseData,
    loading: userContentPurchaseLoading,
    // eslint-disable-next-line no-unused-vars
    error: userContentPurchasesError,
    triggerApi: userContentPurchaseTriggerApi,
  } = useGetApi(
    getUserContentPurchases,
    getUserContentPurchasesParams,
    transformGetUserContentPurchase
  );

  const getSeriesContentsParams = useMemo(
    () => (contentData?.seriesID ? [contentData.seriesID] : []),
    [contentData?.seriesID]
  );
  const {
    data: seriesData,
    loading: seriesLoading,
    triggerApi: seriesTriggerApi,
  } = useGetApi(
    getSeriesContents,
    getSeriesContentsParams,
    transformGetSeriesContents
  );

  const handleCardClick = contentID =>
    history.push(`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${contentID}`);

  const handleSeasonSelectorClickAway = () => {
    setSeasonSelectorOpen(false);
  };

  const handleSeasonSelectorClick = () => setSeasonSelectorOpen(prev => !prev);

  const handleSeasonClick = seasonNo => {
    setSeriesContents();
    handleSeasonSelectorClickAway();
    const episodeData = seriesData.find(
      episode =>
        episode.seriesInfo.seasonNo === seasonNo &&
        episode.seriesInfo.episodeNo === 1
    );
    history.push(`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${episodeData.id}`);
  };

  const handleRazorPaySuccess = () => contentTriggerApi();

  const handleRazorPay = (
    event,
    userId,
    contentAmount,
    productId,
    contentType,
    purchaseType
  ) => {
    loadRazorPay(
      event,
      userId,
      contentAmount,
      productId,
      contentType,
      purchaseType,
      handleRazorPaySuccess
    );
  };
  const handleAddToWatchlist = () => {
    postAddWatchList(userId, {
      contentId: contentData.id,
    }).then(() => {
      setUserWatchlistData(prev => [...prev, contentData.id]);
    });
  };

  const handleRemovefromWatchlist = () => {
    deleteRemoveFromWatchlist(userId, contentData.id).then(() => {
      setUserWatchlistData(prev =>
        prev.filter(watchlistItem => watchlistItem !== contentData.id)
      );
    });
  };
  // Show Play Button if user has made the video purchase
  useEffect(() => {
    setIsVideoAvailable(!!userContentPurchaseData?.isTicketValid);
  }, [userContentPurchaseData]);

  // Set Watch next to first 4 contents from /contents
  useEffect(() => {
    if (contentsData)
      setRecommendedContents(
        contentsData?.contents
          ?.filter(content => content.id !== params.contentID)
          .slice(0, 4)
      );
  }, [contentsData, contentData, params.contentID]);

  // Set Watch next to next episodes in series
  useEffect(() => {
    if (contentData && seriesData) {
      const nextInSeries = seriesData.filter(
        episode =>
          episode.seriesInfo.seasonNo === contentData.seriesInfo.seasonNo &&
          episode.id !== contentData.id &&
          episode.seriesInfo.episodeNo > contentData.seriesInfo.episodeNo
      );

      setSeriesContents(nextInSeries);
    }
  }, [seriesData, contentData, params.contentID]);

  useEffect(() => {
    if (contentData && !contentData.seriesID) contentsTriggerApi();
  }, [contentsTriggerApi, contentData]);

  useEffect(() => {
    if (contentData?.seriesID) seriesTriggerApi();
  }, [contentData, seriesTriggerApi]);

  useEffect(() => {
    if (userId && contentData?.id) userContentPurchaseTriggerApi();
  }, [userId, contentData, userContentPurchaseTriggerApi]);

  useEffect(() => contentTriggerApi(), [contentTriggerApi, params.contentID]);

  const PurchaseTypeElements = () => {
    if (contentData?.purchase_type === "b")
      return (
        <PurchaseButton
          btnText={`Buy now @ ₹${contentData?.price["b"]}`}
          onClick={event => {
            handleRazorPay(
              event,
              userId,
              contentData?.price["b"],
              contentData?.seriesInfo.seasonId || contentData?.id,
              contentData?.seriesInfo.seasonId ? "series" : "content",
              contentData?.purchase_type
            );
          }}
        />
      );
    if (contentData?.purchase_type === "r")
      return (
        <PurchaseButton
          btnText={`Rent now @ ₹${contentData?.price["r"]}`}
          onClick={event => {
            handleRazorPay(
              event,
              userId,
              contentData?.price["r"],
              contentData?.seriesInfo?.seasonId || contentData?.id,
              contentData?.seriesInfo.seasonId ? "series" : "content",
              contentData?.purchase_type
            );
          }}
        />
      );
    if (contentData?.purchase_type === "w")
      return (
        <PurchaseButton
          btnText={`Purchase ticket now @ ₹${contentData?.price["w"]}`}
          onClick={event => {
            handleRazorPay(
              event,
              userId,
              contentData?.price["w"],
              contentData?.seriesInfo?.seasonId || contentData?.id,
              contentData?.seriesInfo.seasonId ? "series" : "content",
              contentData?.purchase_type
            );
          }}
        />
      );
    if (contentData?.purchase_type === "br")
      return (
        <>
          <PurchaseButton
            btnText={`Buy now @ ₹${contentData?.price["b"]}`}
            onClick={event => {
              handleRazorPay(
                event,
                userId,
                contentData?.price["b"],
                contentData?.seriesInfo?.seasonId || contentData?.id,
                contentData?.seriesInfo.seasonId ? "series" : "content",
                "b"
              );
            }}
          />
          <PurchaseButton
            btnText={`Rent now @ ₹${contentData?.price["r"]}`}
            onClick={event => {
              handleRazorPay(
                event,
                userId,
                contentData?.price["r"],
                contentData?.seriesInfo?.seasonId || contentData?.id,
                contentData?.seriesInfo.seasonId ? "series" : "content",
                "r"
              );
            }}
          />
        </>
      );
    return <></>;
  };

  if (
    contentLoading ||
    contentsLoading ||
    seriesLoading ||
    userContentPurchaseLoading
  )
    return <PageLoader />;

  if (contentError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.posterContainer}>
          <Grid container>
            <Grid item md={6} xs={12}>
              <Box p={2} mt={2}>
                <Typography color="secondary" variant="h4">
                  <Box fontWeight="fontWeightBold">
                    {contentData?.seriesInfo?.seriesName || contentData?.name}
                  </Box>
                </Typography>
                {contentData?.rating && (
                  <Typography variant="subtitle2">{`Rating: ${contentData?.rating}`}</Typography>
                )}
                <Box my={1}>
                  {contentData?.genres.map((genre, index) => (
                    <Box component="span" key={`genre-${index}`} pr={1}>
                      <Button
                        className={classes.genreBtn}
                        variant="outlined"
                        color="secondary"
                      >
                        {genre}
                      </Button>
                    </Box>
                  ))}
                </Box>
                {contentData?.seriesID && (
                  <Box py={2}>
                    <Typography color="secondary" variant="h6">
                      {contentData?.name}
                    </Typography>
                  </Box>
                )}
                {contentData?.seriesInfo.seasonNo && seriesData && (
                  <Box py={2}>
                    <ClickAwayListener
                      onClickAway={handleSeasonSelectorClickAway}
                    >
                      <Box className={classes.seasonSelectorContainer}>
                        <Box>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSeasonSelectorClick}
                          >
                            Season {contentData?.seriesInfo.seasonNo}
                            <ArrowDropDown />
                          </Button>
                        </Box>

                        {seasonSelectorOpen && (
                          <Box className={classes.seasonSelectorDropdown}>
                            {Array(
                              Math.max(
                                ...seriesData.map(o => o.seriesInfo.seasonNo),
                                0
                              )
                            )
                              .fill(0)
                              .map((_, index) => (
                                <Box key={`season-menu-item-${index}`}>
                                  <Button
                                    onClick={() => handleSeasonClick(index + 1)}
                                    variant="contained"
                                    color="primary"
                                    className={classes.seasonSelectorItem}
                                  >
                                    Season {index + 1}
                                  </Button>
                                </Box>
                              ))}
                          </Box>
                        )}
                      </Box>
                    </ClickAwayListener>
                  </Box>
                )}
                <Box my={3}>
                  <Typography>{contentData?.description}</Typography>
                </Box>

                <Box>
                  <Typography variant="h6" color="secondary">
                    Starring
                  </Typography>
                  {contentData?.cast.map((actor, i) => (
                    <Box>
                      <Box
                        component="div"
                        display="inline"
                        fontWeight="fontWeightBold"
                      >
                        {actor.name}{" "}
                      </Box>
                      <Box component="div" display="inline" style={{}}>
                        as {actor.role}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box my={2}>
                  {isVideoAvailable && contentData ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.playBtn}
                    >
                      {`Play `}{" "}
                      <PlayCircleOutlineOutlined
                        className={classes.platBtnIcon}
                      />
                    </Button>
                  ) : (
                    <>
                      <PurchaseTypeElements />
                    </>
                  )}
                </Box>
                <Box my={3}>
                  {userWatchlistData?.includes(contentData?.id) ? (
                    <Button
                      color="secondary"
                      variant="outlined"
                      className={classes.watchlistBtn}
                      onClick={handleRemovefromWatchlist}
                    >
                      ✓ Remove from Watchlist
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      variant="outlined"
                      className={classes.watchlistBtn}
                      onClick={handleAddToWatchlist}
                    >
                      Add to Watchlist
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <img src={contentData?.posterUrl} alt="Not available" />
        </Grid>

        {recommendedContents && (
          <Grid item xs={12}>
            <Box py={1} pl={2} pr={3}>
              <Box py={2}>
                <Typography variant="h4">Watch next</Typography>
              </Box>
              <Grid container spacing={4}>
                {recommendedContents.map((contentCard, index) => (
                  <Grid
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    item
                    key={`content-card-${index}`}
                  >
                    <MovieCard
                      cardData={contentCard}
                      onClick={handleCardClick}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        )}
        {seriesContents?.length > 0 && (
          <Grid item xs={12}>
            <Box py={1} pl={2} pr={3}>
              <Box py={2}>
                <Typography variant="h4">Watch next</Typography>
              </Box>
              <Grid container spacing={4}>
                {seriesContents?.map((contentCard, index) => (
                  <Grid
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                    item
                    key={`content-card-${index}`}
                  >
                    <MovieCard
                      cardData={contentCard}
                      onClick={handleCardClick}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default VideoDetailPage;
