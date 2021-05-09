import React, { useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@material-ui/core";
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

    const getHistoryDataParams = useMemo(() => [params.userID], []);

    const {
        data: ticketsData,
        loading: ticketsLoading,
        error: ticketsError,
        triggerApi: ticketsTriggerApi,
    } = useGetApi(
        getHistoryData,
        getHistoryDataParams,
        transformGetHistoryData
    );

    useEffect(() => ticketsTriggerApi(), [ticketsTriggerApi]);

    if (ticketsLoading) return <PageLoader />;

    if (ticketsError)
        return (
            <PageError message="Oops.. Something went wrong while fetching your tickets." />
        );

    return (
        <Container maxWidth="lg">
            <Grid container spacing={8}>
                <Grid item xs={6} spacing={4}>
                    <Typography
                        variant="h3"
                        className={classes.heading}
                        style={{ padding: "1rem" }}
                    >
                        Your Valid Tickets
                    </Typography>
                    <Grid item xs={12}>
                        {ticketsData?.map(
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
                                        />
                                    </Grid>
                                )
                        )}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={6}
                    spacing={4}
                    style={{
                        margin: "18px 0px",
                        borderLeft: "4px solid yellow",
                    }}
                >
                    <Typography
                        variant="h5"
                        className={classes.heading}
                        style={{
                            padding: "1rem",
                        }}
                    >
                        Purchase History
                    </Typography>
                    <Grid item xs={12}>
                        {ticketsData?.map((historyCard, index) => (
                            <Grid
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                item
                                key={`content-card-${index}`}
                            >
                                <HistoryCard historyCard={historyCard} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default TicketsPage;
