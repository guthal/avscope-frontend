import React, { useEffect, useMemo } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import ContentCard from "../../components/ContentCard";
import useGetApi from "../../hooks/useGetApi";
import { getContents } from "../../utils/api";
import { transformGetContents } from "../../utils/api-transforms";
import HistoryCard from "../../components/HistoryCard";

function HistoryPage() {
    const getContentsParams = useMemo(() => ["param1", "param2"], []);

    const {
        data: historyData,
        loading: contentsLoading,
        error: contentsError,
        triggerApi: contentsTriggerApi,
    } = useGetApi(getContents, getContentsParams, transformGetContents);

    useEffect(() => contentsTriggerApi(), [contentsTriggerApi]);

    if (contentsLoading) return <PageLoader />;

    if (contentsError)
        return (
            <PageError message="Opps.. Something went wrong while fetching contents." />
        );

    return (
        <Container maxWidth="lg">
            <Box py={5}>
                <Grid container spacing={4}>
                    {historyData?.map((historyCard, index) => (
                        <Grid
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            item
                            key={`content-card-${index}`}
                        >
                            <ContentCard>
                                <HistoryCard historyCard={historyCard} />
                            </ContentCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default HistoryPage;
