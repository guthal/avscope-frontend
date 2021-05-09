import { Container, Typography, Button, Box, Grid } from "@material-ui/core";
import { PlayCircleOutlineOutlined } from "@material-ui/icons";
import { useRouteMatch } from "react-router-dom";
import React, { useMemo, useEffect, useState } from "react";
import useGetApi from "../../hooks/useGetApi";
import { getContent } from "../../utils/api";
import { transformGetContent } from "../../utils/api-transforms";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useStyles from "./ContentPage.Styles";

const PurchaseButton = ({ btnText }) => {
  const classes = useStyles();

  return (
    <Box component="span" pr={2}>
      <Button
        color="secondary"
        variant="contained"
        className={classes.purchaseBtn}
      >
        {btnText}
      </Button>
    </Box>
  );
};

function ContentPage() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  // eslint-disable-next-line no-unused-vars
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);

  const { params } = routeMatch;

  const getContentParams = useMemo(() => [params.contentID], [
    params.contentID,
  ]);

  const {
    data: contentData,
    loading: contentLoading,
    error: contentError,
    triggerApi: triggerGetContentApi,
  } = useGetApi(getContent, getContentParams, transformGetContent);

  useEffect(() => triggerGetContentApi(), [triggerGetContentApi]);

  if (contentLoading) return <PageLoader />;

  if (contentError)
    return (
      <PageError message="Opps.. Something went wrong while fetching contents." />
    );

  const PurchaseTypeElements = () => {
    if (contentData?.purchase_type === "weekly")
      return (
        <PurchaseButton btnText={`Buy now @ $${contentData?.price.buy}`} />
      );
    if (contentData?.purchase_type === "r")
      return (
        <PurchaseButton btnText={`Rent now @ $${contentData?.price.rent}`} />
      );
    if (contentData?.purchase_type === "weekly")
      return (
        <PurchaseButton
          btnText={`Purchase ticket now @ $${contentData?.price.weekly}`}
        />
      );
    if (contentData?.purchase_type === "br")
      return (
        <>
          <PurchaseButton btnText={`Buy now @ $${contentData?.price.buy}`} />
          <PurchaseButton btnText={`Rent now @ $${contentData?.price.rent}`} />
        </>
      );
    return <></>;
  };

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container className={classes.posterContainer}>
            <Grid item md={6} xs={12}>
              <Box p={2} mt={2}>
                <Typography variant="h4">{contentData?.name}</Typography>
                <Typography variant="subtitle2">{`Rating: ${contentData?.rating}`}</Typography>
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
                <Box my={3}>
                  <Typography>{contentData?.description}</Typography>
                </Box>

                <Box my={5}>
                  {isVideoAvailable ? (
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
              </Box>
            </Grid>
            <img src={contentData?.posterUrl} alt="Not available" />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContentPage;
