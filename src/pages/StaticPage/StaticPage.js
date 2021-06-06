import React, { useEffect, useMemo } from "react";
import { Box, Typography, Container } from "@material-ui/core";
import useGetApi from "../../hooks/useGetApi";
import { getStaticPage } from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import { useHistory, useRouteMatch } from "react-router";
import { transformGetStaticPage } from "../../utils/api-transforms";
import { APP_ROUTES } from "../../configs/app";

function StaticPage() {
  const history = useHistory();
  const routeMatch = useRouteMatch;
  const { params } = routeMatch();

  const getStaticPageParams = useMemo(() => [params.type], [params.type]);

  const {
    data: staticPageData,
    loading: staticPageLoading,
    error: staticPageError,
    triggerApi: staticPageTriggerApi,
  } = useGetApi(getStaticPage, getStaticPageParams, transformGetStaticPage);

  useEffect(() => staticPageTriggerApi(), [staticPageTriggerApi]);

  if (staticPageLoading) return <PageLoader />;

  if (staticPageError)
    return (
      <PageError message="Oops.. Something went wrong while Loading the Page." />
    );

  return (
    <Container maxWidth="lg" style={{ minHeight: "50vh" }}>
      <Box>
        <Box fontWeight="fontWeightBold">
          <Typography variant="h3">{staticPageData?.head}</Typography>
        </Box>
        <Box dangerouslySetInnerHTML={{ __html: staticPageData?.body }} />
      </Box>
    </Container>
  );
}

export default StaticPage;
