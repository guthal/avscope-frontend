import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Box, Typography, Container, Grid, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useGetApi from "../../hooks/useGetApi";
import { getContents, getAllSeries } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import { useHistory } from "react-router";
import useStyles from "./ManageContentPage.Styles";
import {
  transformGetContents,
  transformGetAllSeries,
} from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";
import ManageContentCard from "../../components/ManageContentCard";
import ConversionCard from "../../components/ConversionCard";

function ManageContentPage() {
  const classes = useStyles();
  const history = useHistory();
  const getContentsParams = useMemo(() => [], []);

  const [searchValue, setSearchValue] = useState("");

  const {
    data: contentsData,
    loading: contentsLoading,
    error: contentsError,
    triggerApi: contentsTriggerApi,
  } = useGetApi(getContents, getContentsParams, transformGetContents);

  const getAllSeriesParams = useMemo(() => [], []);
  const {
    data: seriesSeasonsData,
    loading: seriesSeasonsLoading,
    error: seriesSeasonsError,
    triggerApi: seriesSeasonsTriggerApi,
  } = useGetApi(getAllSeries, getAllSeriesParams, transformGetAllSeries);

  const handleCardClick = contentID =>
    history.push(`${APP_ROUTES.VIDEO_DETAIL_PAGE.path}/${contentID}`);

  const handleSearchClick = event => {
    setSearchValue(event.target.value);
  };

  const onContentStatusUpdate = () => contentsTriggerApi();

  useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

  useEffect(() => seriesSeasonsTriggerApi(), [seriesSeasonsTriggerApi]);

  if (contentsLoading || seriesSeasonsLoading) return <PageLoader />;

  if (contentsError || seriesSeasonsError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Grid container>
          <Grid item lg={4} md={4} sm={6} xs={12} className={classes.search}>
            <Box className={classes.searchIcon}>
              <SearchIcon />
            </Box>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="search"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchClick}
              inputProps={{ "aria-label": "search" }}
            />
          </Grid>
        </Grid>
        <Box py={1}>
          <Box py={6}>
            <Typography variant="h3">Weekly Contents</Typography>
          </Box>
          <Grid container spacing={4}>
            {contentsData?.contents
              ?.filter(
                content =>
                  content.purchaseType === "w" &&
                  content.name
                    .toLowerCase()
                    .includes(searchValue?.toLowerCase())
              )
              .sort((a, b) => a.isExpired - b.isExpired)
              .map((contentCard, index) => (
                <Grid
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  item
                  key={`content-card-${index}`}
                >
                  <ConversionCard
                    cardData={contentCard}
                    onContentStatusUpdate={onContentStatusUpdate}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box py={2}>
          <Typography variant="h3">Availability</Typography>
        </Box>
        <Box py={1}>
          <Box py={2}>
            <Typography variant="h4">Stand Alone Contents</Typography>
          </Box>
          <Grid container spacing={4}>
            {contentsData?.contents
              ?.filter(content =>
                content.name.toLowerCase().includes(searchValue?.toLowerCase())
              )
              .map((contentCard, index) => (
                <Grid
                  lg={3}
                  md={3}
                  sm={6}
                  xs={12}
                  item
                  key={`content-card-${index}`}
                >
                  <ManageContentCard
                    cardData={contentCard}
                    onClick={handleCardClick}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        {seriesSeasonsData?.length > 0 && (
          <Box py={1}>
            <Box py={2}>
              <Typography variant="h4">Series</Typography>
            </Box>
            <Grid container spacing={4}>
              {seriesSeasonsData
                .map(series => series.seasons)
                .map((season, i) => (
                  <Fragment key={i}>
                    {season?.map((contentCard, index) => (
                      <Grid
                        lg={3}
                        md={3}
                        sm={6}
                        xs={12}
                        item
                        key={`content-card-${index}`}
                      >
                        <ManageContentCard
                          cardData={contentCard}
                          onClick={handleCardClick}
                        />
                      </Grid>
                    ))}
                  </Fragment>
                ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ManageContentPage;
