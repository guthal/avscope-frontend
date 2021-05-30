import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Switch,
  Grid,
  TextField,
} from "@material-ui/core";
import useStyles from "./ConversionCard.Styles";
import ContentCard from "../ContentCard";
import usePostApi from "../../hooks/usePostApi";
import { postContentConversion } from "../../utils/api";
import PageError from "../../components/PageError";

function ConversionCard({ cardData, onContentStatusUpdate }) {
  const classes = useStyles();

  const [purchaseTypeSwitches, setPurchaseTypeSwitches] = useState({
    "buy-switch": false,
    "rent-switch": false,
    "weekly-switch": true,
  });
  const [purchaseTypeFields, setPurchaseTypeFields] = useState({
    "buy-field": "-1",
    "rent-field": "-1",
    "weekly-field": cardData.price["w"],
    "weekly-num-field": cardData.weeks,
  });

  const postContentConversionParams = useMemo(
    () => [cardData.id],
    [cardData.id]
  );

  const handleSwitchTextChange = (event) => {
    setPurchaseTypeFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSwitchChange = (event) => {
    if (event.target.name === "weekly-switch") {
      setPurchaseTypeSwitches((prev) => ({
        ...prev,
        [event.target.name]: event.target.checked,
        "buy-switch": false,
        "rent-switch": false,
      }));
      setPurchaseTypeFields((prev) => ({
        ...prev,
        "buy-field": -1,
        "rent-field": -1,
      }));
    } else {
      setPurchaseTypeSwitches((prev) => ({
        ...prev,
        [event.target.name]: event.target.checked,
        "weekly-switch": false,
      }));
      setPurchaseTypeFields((prev) => ({
        ...prev,
        "weekly-field": -1,
        "weekly-num-field": 0,
      }));
    }
  };

  const {
    data: contentConversionData,
    triggerPostApi: contentConversionTriggerApi,
    error: contentConversionError,
  } = usePostApi(postContentConversion, postContentConversionParams);

  const handleSubmit = () => {
    contentConversionTriggerApi({
      price: {
        b: purchaseTypeFields["buy-field"],
        r: purchaseTypeFields["rent-field"],
        w: purchaseTypeFields["weekly-field"],
      },
      weeks: purchaseTypeFields["weekly-num-field"],
    });
  };

  useEffect(() => {
    if (contentConversionData) onContentStatusUpdate();
  }, [contentConversionData, onContentStatusUpdate]);

  if (contentConversionError)
    return (
      <PageError message="Opps.. Something went wrong while updating content status." />
    );

  return (
    <Box>
      <ContentCard overriddenCardClassName={classes.card}>
        <Box p={2}>
          <Box p={2}>
            <Typography variant="h5" align="center" color="primary">
              {cardData.seriesName || cardData.name}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Box>
                    <Box px={2}>
                      <Typography color="primary">Buy</Typography>
                    </Box>
                    <Box>
                      <Switch
                        name="buy-switch"
                        checked={purchaseTypeSwitches["buy-switch"]}
                        onChange={handleSwitchChange}
                        color="primary"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={8} md={5}>
                  <Box mt={1}>
                    {purchaseTypeSwitches["buy-switch"] && (
                      <TextField
                        label="Buy Price"
                        name="buy-field"
                        value={purchaseTypeFields["buy-field"]}
                        color="primary"
                        variant="outlined"
                        onChange={handleSwitchTextChange}
                        placeholder="In Rupees"
                        required
                        className={classes.textField}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Box>
                    <Box px={2}>
                      <Typography color="primary">Rent</Typography>
                    </Box>
                    <Box>
                      <Switch
                        name="rent-switch"
                        checked={purchaseTypeSwitches["rent-switch"]}
                        onChange={handleSwitchChange}
                        color="primary"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={8} md={5}>
                  <Box mt={1}>
                    {purchaseTypeSwitches["rent-switch"] && (
                      <TextField
                        label="Rent Price"
                        name="rent-field"
                        value={purchaseTypeFields["rent-field"]}
                        color="primary"
                        variant="outlined"
                        onChange={handleSwitchTextChange}
                        placeholder="In Rupees"
                        className={classes.textField}
                        required
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Box>
                    <Box px={2}>
                      <Typography color="primary">Weekly</Typography>
                    </Box>
                    <Box>
                      <Switch
                        name="weekly-switch"
                        checked={purchaseTypeSwitches["weekly-switch"]}
                        onChange={handleSwitchChange}
                        color="primary"
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={5} md={5}>
                  <Box mt={1}>
                    {purchaseTypeSwitches["weekly-switch"] && (
                      <TextField
                        label="Weekly Price"
                        name="weekly-field"
                        value={purchaseTypeFields["weekly-field"]}
                        color="primary"
                        variant="outlined"
                        onChange={handleSwitchTextChange}
                        placeholder="In Rupees"
                        className={classes.textField}
                        required
                      />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={4} md={4}>
                  <Box mt={1}>
                    {purchaseTypeSwitches["weekly-switch"] && (
                      <TextField
                        label="Weeks"
                        name="weekly-num-field"
                        value={purchaseTypeFields["weekly-num-field"]}
                        color="primary"
                        variant="outlined"
                        onChange={handleSwitchTextChange}
                        placeholder="In Rupees"
                        className={classes.textField}
                        required
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box py={2} style={{ float: "right" }}>
                <Button
                  onClick={handleSubmit}
                  align="right"
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ContentCard>
    </Box>
  );
}

export default ConversionCard;
