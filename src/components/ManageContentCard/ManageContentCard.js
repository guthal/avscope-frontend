import React, { useMemo, useState } from "react";
import { Box, Typography, Button, Switch } from "@material-ui/core";
import useStyles from "./ManageContentCard.Styles";
import ContentCard from "../ContentCard";
import usePostApi from "../../hooks/usePostApi";
import { postUpdateProductStatus } from "../../utils/api";
import PageError from "../../components/PageError";

function ManageContentCard({ cardData }) {
  const classes = useStyles();

  const [isAvailable, setIsAvailable] = useState(cardData.isAvailable);

  const contentType = cardData.seasonNo ? "series" : "content";

  const postUpdateProductStatusParams = useMemo(
    () => [cardData.seasonId || cardData.id],
    [cardData.seasonId, cardData.id]
  );

  const { triggerPostApi: contentStatusTriggerApi, error: contentStatusError } =
    usePostApi(postUpdateProductStatus, postUpdateProductStatusParams);

  const handleSwitchChange = (event) => {
    setIsAvailable(event.target.checked);
    contentStatusTriggerApi({
      isAvailable: event.target.checked,
      contentType,
    });
  };

  if (contentStatusError)
    return (
      <PageError message="Opps.. Something went wrong while updating content status." />
    );

  return (
    <Box className={classes.contentCardContainer}>
      <ContentCard>
        <Box p={2}>
          <Box>
            <Typography variant="h6" color="secondary">
              {cardData.seriesName || cardData.name}
            </Typography>
            <Switch
              color="secondary"
              checked={isAvailable}
              onChange={handleSwitchChange}
            />
          </Box>
          {cardData.seasonNo && (
            <Box>
              <Button
                className={classes.seasonBtn}
                color="secondary"
                variant="outlined"
              >
                {`Season ${cardData.seasonNo}`}
              </Button>
            </Box>
          )}
        </Box>
      </ContentCard>
    </Box>
  );
}

export default ManageContentCard;
