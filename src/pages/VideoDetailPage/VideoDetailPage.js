import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Link,
  ClickAwayListener,
} from "@material-ui/core";
import { PlayCircleOutlineOutlined, ArrowDropDown } from "@material-ui/icons";
import TimerIcon from "@material-ui/icons/Timer";
import { Stream } from "@cloudflare/stream-react";
import { useHistory, useRouteMatch } from "react-router-dom";
import React, { useMemo, useEffect, useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import MovieCard from "../../components/MovieCard";
import CountdownTimer from "../../components/CountdownTimer";
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
import { getRandomAd, PRIORITIZED_ADS } from "../../configs/ads";

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
  const { userId, userAge, userWatchlistData, setUserWatchlistData } =
    useContext(AuthContext);

  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [recommendedContents, setRecommendedContents] = useState();
  const [seriesContents, setSeriesContents] = useState();
  const [ticketStatus, setTicketStatus] = useState(false);
  const [seasonSelectorOpen, setSeasonSelectorOpen] = useState(false);
  const [ad, setAd] = useState();

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

  const handlePlay = () => setPlayVideo(true);

  const handleVideoPause = () => {
    const randomAd = getRandomAd();
    setAd(randomAd);
  };

  const handleVideoUnpause = () => setAd(undefined);

  const handleComplete = () => {
    setTicketStatus(false);
  };

  useEffect(() => {
    if (userContentPurchaseData) {
      setTicketStatus(userContentPurchaseData?.isTicketValid);
    }
  }, [userContentPurchaseData]);

  // Show Play Button if user has made the video purchase
  useEffect(() => {
    setIsVideoAvailable(
      !!userContentPurchaseData?.isTicketValid ||
        contentData?.purchaseType === "f"
    );
  }, [userContentPurchaseData, contentData]);

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
    if (contentData?.purchaseType === "b")
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
              contentData?.purchaseType
            );
          }}
        />
      );
    if (contentData?.purchaseType === "r")
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
              contentData?.purchaseType
            );
          }}
        />
      );
    if (contentData?.purchaseType === "w")
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
              contentData?.purchaseType
            );
          }}
        />
      );
    if (contentData?.purchaseType === "br")
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

  const ShowPlayAfterAgeCheck = () => {
    if (contentData?.certificate === "A") {
      if (userAge >= 18) {
        return (
          <Box my={3}>
            {isVideoAvailable && ticketStatus ? (
              <Button
                color="secondary"
                variant="contained"
                className={classes.playBtn}
                onClick={handlePlay}
              >
                {`Play `}{" "}
                <PlayCircleOutlineOutlined className={classes.platBtnIcon} />
              </Button>
            ) : (
              <>
                <PurchaseTypeElements />
              </>
            )}
            {isVideoAvailable ? (
              <Typography variant="subtitle1">
                {"Your Ticket Expires in "}
                <TimerIcon />
                <CountdownTimer
                  onComplete={handleComplete}
                  expiryDate={userContentPurchaseData?.expiryDate}
                />
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        );
      } else {
        return (
          <Box my={3}>
            <Button
              color="secondary"
              variant="outlined"
              className={classes.ageRestrictedBtn}
              disableTouchRipple
            >
              {`This Content is Unavailable `}{" "}
            </Button>
          </Box>
        );
      }
    } else {
      if (contentData?.purchaseType === "f") {
        return (
          <Button
            color="secondary"
            variant="contained"
            className={classes.playBtn}
            onClick={handlePlay}
          >
            {`Play `}{" "}
            <PlayCircleOutlineOutlined className={classes.platBtnIcon} />
          </Button>
        );
      } else {
        return (
          <Box my={3}>
            {isVideoAvailable && ticketStatus ? (
              <Button
                color="secondary"
                variant="contained"
                className={classes.playBtn}
                onClick={handlePlay}
              >
                {`Play `}{" "}
                <PlayCircleOutlineOutlined className={classes.platBtnIcon} />
              </Button>
            ) : (
              <>
                <PurchaseTypeElements />
              </>
            )}
            {isVideoAvailable && ticketStatus ? (
              <Typography variant="subtitle1">
                {"Your Ticket Expires in "}{" "}
                <TimerIcon style={{ paddingTop: "5px" }} />
                <CountdownTimer
                  onComplete={handleComplete}
                  expiryDate={userContentPurchaseData?.expiryDate}
                />
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        );
      }
    }
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
      <PageError message="Oops.. Something went wrong while fetching contents." />
    );

  return (
    <>
      <Container
        maxWidth="xl"
        className={classes.root}
        style={playVideo ? { maxHeight: "80vh", overflow: "hidden" } : {}}
      >
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
                    <Box
                      component="span"
                      className={classes.certificateContainer}
                    >
                      <Box
                        component="span"
                        className={classes.certificateElement}
                      >
                        {contentData?.certificate}
                      </Box>
                    </Box>
                    <Box component="div" display="inline">
                      {contentData?.genres.map((genre, index) => (
                        <Box component="span" key={`genre-${index}`} px={1}>
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
                                      onClick={() =>
                                        handleSeasonClick(index + 1)
                                      }
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
                      <Box key={i}>
                        <Box
                          component="div"
                          display="inline"
                          fontWeight="fontWeightBold"
                          style={{ fontSize: "16px" }}
                        >
                          {actor.name}{" "}
                        </Box>
                        <Box component="div" display="inline">
                          as {actor.role}
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box py={1}>
                    <Box>
                      <Typography component="span" color="secondary">
                        Language:{" "}
                      </Typography>
                      <Typography component="span">
                        {contentData?.language}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography component="span" color="secondary">
                        Subtitle:{" "}
                      </Typography>
                      <Typography component="span">
                        {contentData?.subtitleLanguage}
                      </Typography>
                    </Box>
                  </Box>

                  <ShowPlayAfterAgeCheck />
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

          <Grid item xs={12}>
            <Box p={2}>
              <Grid container spacing={4}>
                {PRIORITIZED_ADS.map((ad, i) => (
                  <Grid item xs={6} md={3} lg={2} key={i}>
                    <Box className={classes.adContainer}>
                      <Link href={ad.url} target="_blank">
                        <Button
                          color="secondary"
                          variant="contained"
                          className={classes.adSponsor}
                        >
                          Ad
                        </Button>
                        <img src={ad.posterUrl} alt={ad.name} />
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
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
      {playVideo && (
        <Box
          style={{
            position: "absolute",
            zIndex: 1100,
            width: "100%",
            top: 0,
            backgroundColor: "black",
            overflowY: "hidden",
          }}
        >
          <Box
            style={{
              float: "right",
              zIndex: "1",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              style={{ fontSize: "2rem" }}
              onClick={() => setPlayVideo(false)}
            >
              <b>X</b>
            </Button>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Box style={{ width: "100vh" }}>
              {contentData?.purchaseType === "w" ? (
                <iframe
                  title="Weekly"
                  src={contentData.contentURL}
                  style={{
                    border: 0,
                    maxWidth: "90%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "90%",
                  }}
                  allowFullScreen="true"
                  allow="encrypted-media"
                />
              ) : (
                <>
                  {ad && (
                    <Box className={classes.adPoster} padding={2}>
                      <Link href={ad.link} target="_blank">
                        <Button
                          color="secondary"
                          variant="contained"
                          className={classes.adSponsor}
                        >
                          Ad
                        </Button>
                        <img src={ad.img_url.square} alt={ad.name} />
                      </Link>
                    </Box>
                  )}
                  <Stream
                    onPause={handleVideoPause}
                    onPlay={handleVideoUnpause}
                    controls
                    src={contentData?.contentURL}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default VideoDetailPage;
