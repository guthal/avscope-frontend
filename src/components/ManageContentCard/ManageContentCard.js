import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Switch } from "@material-ui/core";
import useStyles from "./ManageContentCard.Styles";
import ContentCard from "../ContentCard";
import usePostApi from "../../hooks/usePostApi";
import { postUpdateProductStatus } from "../../utils/api";

function ManageContentCard({ cardData }) {
  const classes = useStyles();

  const [isAvailable, setIsAvailable] = useState(cardData.isAvailable);

  const contentType = cardData.seasonNo ? "series" : "content";

  const postUpdateProductStatusParams = useMemo(
    () => [cardData.seasonId || cardData.id],
    [cardData.seasonId, cardData.id]
  );

  const {
    data: contentStatusData,
    loading: contentStatusLoading,
    triggerPostApi: contentStatusTriggerApi,
    error: contentStatusError,
  } = usePostApi(postUpdateProductStatus, postUpdateProductStatusParams);

  const handleSwitchChange = (event) => {
    setIsAvailable(event.target.checked);
    contentStatusTriggerApi({
      isAvailable: event.target.checked,
      contentType,
    });
  };

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
