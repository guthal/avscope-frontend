import React, { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useGetApi from "../../hooks/useGetApi";
import { transformGetHistoryData } from "../../utils/api-transforms";
import HistoryCard from "../../components/HistoryCard";
import useStyles from "./HistoryPage.Styles";
import { getHistoryData } from "../../utils/api";

function HistoryPage() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;

  const getHistoryDataParams = useMemo(() => [params.userID], [params.userID]);

  const {
    data: historyData,
    loading: historyLoading,
    error: historyError,
    triggerApi: historyTriggerApi,
  } = useGetApi(getHistoryData, getHistoryDataParams, transformGetHistoryData);

  useEffect(() => historyTriggerApi(), [historyTriggerApi]);

  if (historyLoading) return <PageLoader />;

  if (historyError)
    return (
      <PageError message="Oops.. Something went wrong while fetching contents." />
    );

  return (
    <Container maxWidth="lg">
      <Box py={2} className={classes.root}>
        <Box p={3}>
          <Typography variant="h3" className={classes.heading}>
            Purchase History
          </Typography>
        </Box>
        {historyData?.length > 0 ? (
          <Grid container spacing={4}>
            {historyData?.map((historyCard, index) => (
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={12}
                item
                key={`content-card-${index}`}
              >
                <HistoryCard
                  historyCard={historyCard}
                  handleRazorpaySuccess={historyTriggerApi}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box px={3}>
            <Typography variant="h5">No History data found</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default HistoryPage;
