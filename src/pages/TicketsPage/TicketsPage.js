import React, { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import ContentCard from "../../components/ContentCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useGetApi from "../../hooks/useGetApi";
import { transformGetHistoryData } from "../../utils/api-transforms";
import HistoryCard from "../../components/HistoryCard";
import useStyles from "./TicketsPage.Styles";
import { getHistoryData } from "../../utils/api";

function TicketsPage() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;

  const getHistoryDataParams = useMemo(() => [params.userID], [params.userID]);

  const {
    data: ticketsData,
    loading: ticketsLoading,
    error: ticketsError,
    triggerApi: ticketsTriggerApi,
  } = useGetApi(getHistoryData, getHistoryDataParams, transformGetHistoryData);

  useEffect(() => ticketsTriggerApi(), [ticketsTriggerApi]);

  if (ticketsLoading) return <PageLoader />;

  if (ticketsError)
    return (
      <PageError message="Oops.. Something went wrong while fetching your tickets." />
    );

  return (
    <Container maxWidth="lg">
      <Box className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box py={2}>
              <Typography
                color="secondary"
                variant="h3"
                className={classes.heading}
              >
                Weekly Valid Tickets
              </Typography>
            </Box>
            {ticketsData?.filter(ticket => ticket.purchaseType === "w").length >
            0 ? (
              <Grid item md={12} sm={6} xs={12}>
                {ticketsData
                  ?.filter(ticket => ticket.purchaseType === "w")
                  .map(
                    (validTickets, index) =>
                      validTickets.isTicketValid && (
                        <Grid
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          item
                          key={`content-card-${index}`}
                        >
                          <HistoryCard
                            historyCard={validTickets}
                            handleRazorpaySuccess={ticketsTriggerApi}
                          />
                        </Grid>
                      )
                  )}
              </Grid>
            ) : (
              <Box>
                <Typography variant="h5">
                  No valid Weekly tickets found
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <ContentCard>
              <Box p={2}>
                <Typography
                  variant="h4"
                  className={classes.heading}
                  color="secondary"
                >
                  All Purchased Contents
                </Typography>
              </Box>
              {ticketsData?.length > 0 ? (
                <Grid container>
                  {ticketsData?.map((historyCard, index) => (
                    <Grid
                      lg={12}
                      md={6}
                      sm={6}
                      xs={12}
                      item
                      key={`content-card-${index}`}
                    >
                      <Box px={2}>
                        <HistoryCard
                          historyCard={historyCard}
                          handleRazorpaySuccess={ticketsTriggerApi}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box px={2} mb={2}>
                  <Typography variant="h5">
                    No Purchase History found
                  </Typography>
                </Box>
              )}
            </ContentCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default TicketsPage;
