import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  IconButton,
  Switch,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  CloseSharp as CloseIcon,
  Add as AddIcon,
  CloseSharp,
} from "@material-ui/icons";
import { useRouteMatch } from "react-router";
import useStyles from "./ContentUploadPage.Styles";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import { CONTENT_GENRES, CONTENT_RESOLUTIONS } from "../../configs/app";
import useGetApi from "../../hooks/useGetApi";
import usePostApi from "../../hooks/usePostApi";
import { getAllSeries, postContentUpload } from "../../utils/api";
import { transformGetAllSeries } from "../../utils/api-transforms";

function GenreButton({ genre, onClick, remove = false }) {
  const classes = useStyles();

  return (
    <Button
      color="primary"
      onClick={() => onClick(genre.index)}
      variant="outlined"
      className={classes.genreBtn}
    >
      {genre.name}
      {remove ? <CloseIcon /> : <AddIcon />}
    </Button>
  );
}

function ContentUploadPage() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;

  const contentList = useMemo(() => ["Movie/Documentary", "Series"], []);
  const [seriesList, setSeriesList] = useState(["New Series"]);
  const [seasonsList, setSeasonsList] = useState(["New Season"]);
  const [contentTypeSelections, setContentTypeSelections] = useState({
    content: contentList[0],
    series: seriesList[0],
    season: seasonsList[0],
  });

  const [selectedGenreList, setSelectedGenreList] = useState([]);
  const [availableGenreList, setAvailableGenreList] = useState(CONTENT_GENRES);
  const [availableContentResolutions, setAvailableContentResolution] =
    useState(CONTENT_RESOLUTIONS);
  const [purchaseTypeSwitches, setPurchaseTypeSwitches] = useState({
    "buy-switch": true,
    "rent-switch": false,
    "weekly-switch": false,
  });
  const [purchaseTypeFields, setPurchaseTypeFields] = useState({
    "buy-field": "",
    "rent-field": "",
    "weekly-field": "",
    "weekly-num-field": "",
  });
  const [formFields, setFormFields] = useState({
    title: "",
    creatorId: params.userID,
    description: "",
    thumbnailURL: "",
    transactionID: "",
    comments: "",
  });

  const [castTextFields, setCastTextFields] = useState([
    { fieldID: 0, role: "", name: "" },
  ]);
  const [contentURLFields, setContentURLFields] = useState([
    { fieldID: 0, URL: "", resolution: "" },
  ]);

  const postContentUploadParams = useMemo(() => [], []);

  const {
    // eslint-disable-next-line no-unused-vars
    data: contentUploadResData,
    loading: contentUploadLoading,
    error: contentUploadError,
    triggerPostApi: triggerContentUploadPostApi,
  } = usePostApi(postContentUpload, postContentUploadParams, undefined);

  const handleContentTypeSelectionsChange = event => {
    setContentTypeSelections(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const getAllSeriesParams = useMemo(() => [], []);
  const {
    data: seriesData,
    // loading: seriesLoading,
    // error: seriesError,
    triggerApi: triggetGetAllSeriesApi,
  } = useGetApi(getAllSeries, getAllSeriesParams, transformGetAllSeries);
  const handleFormFieldsChange = event => {
    setFormFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleContentURLFieldsChange = event => {
    setContentURLFields(prev => {
      const fieldIndex = prev.findIndex(
        contentField =>
          event.target.name === `content-url-${contentField.fieldID}`
      );
      return [
        ...prev.slice(0, fieldIndex),
        { ...prev[fieldIndex], URL: event.target.value },
        ...prev.slice(fieldIndex + 1),
      ];
    });
  };

  const handleContentURLResolutionChange = event => {
    setContentURLFields(prev => {
      const fieldIndex = prev.findIndex(
        contentField =>
          event.target.name === `content-resolution-${contentField.fieldID}`
      );
      return [
        ...prev.slice(0, fieldIndex),
        { ...prev[fieldIndex], resolution: event.target.value },
        ...prev.slice(fieldIndex + 1),
      ];
    });
  };

  const handleCastFieldsChange = event => {
    if (event.target.name.includes("role")) {
      setCastTextFields(prev => {
        const fieldIndex = prev.findIndex(
          castField => event.target.name === `cast-role-${castField.fieldID}`
        );
        return [
          ...prev.slice(0, fieldIndex),
          { ...prev[fieldIndex], role: event.target.value },
          ...prev.slice(fieldIndex + 1),
        ];
      });
    } else if (event.target.name.includes("name")) {
      setCastTextFields(prev => {
        const fieldIndex = prev.findIndex(
          castField => event.target.name === `cast-name-${castField.fieldID}`
        );
        return [
          ...prev.slice(0, fieldIndex),
          { ...prev[fieldIndex], name: event.target.value },
          ...prev.slice(fieldIndex + 1),
        ];
      });
    }
  };

  const handleAddContentURL = () => {
    setContentURLFields(prev => [
      ...prev,
      { fieldID: prev.length, role: "", name: "" },
    ]);
  };

  const handleRemoveContentURL = index => {
    const updatedContentFields = [
      ...contentURLFields.slice(0, index),
      ...contentURLFields.slice(index + 1),
    ];

    updatedContentFields.forEach((contentField, index) => {
      contentField.fieldID = index;
    });

    setContentURLFields(() => updatedContentFields);
  };

  const handleAddCast = () => {
    setCastTextFields(prev => [
      ...prev,
      { fieldID: prev.length, role: "", name: "" },
    ]);
  };

  const handleRemoveCast = index => {
    const updatedCastFields = [
      ...castTextFields.slice(0, index),
      ...castTextFields.slice(index + 1),
    ];

    updatedCastFields.forEach((castField, index) => {
      castField.fieldID = index;
    });

    setCastTextFields(() => updatedCastFields);
  };

  const handleRemoveGenre = index => {
    setAvailableGenreList(prev => [...prev, selectedGenreList[index]]);
    setSelectedGenreList(prev => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleAddGenre = index => {
    setSelectedGenreList(prev => [...prev, availableGenreList[index]]);
    setAvailableGenreList(prev => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleSwitchChange = event => {
    if (event.target.name === "weekly-switch")
      setPurchaseTypeSwitches(prev => ({
        ...prev,
        [event.target.name]: event.target.checked,
        "buy-switch": false,
        "rent-switch": false,
      }));
    else
      setPurchaseTypeSwitches(prev => ({
        ...prev,
        [event.target.name]: event.target.checked,
        "weekly-switch": false,
      }));
  };

  const handleSwitchTextChange = event => {
    setPurchaseTypeFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    if (
      !(
        formFields.title &&
        formFields.creatorId &&
        formFields.description &&
        formFields.thumbnailURL
      )
    )
      return;

    if (
      (contentTypeSelections.content === contentList[0] ||
        (contentTypeSelections.series !== seriesList[0] &&
          contentTypeSelections.season === seasonsList[0])) &&
      !(
        (purchaseTypeFields["buy-field"] ||
          purchaseTypeFields["rent-field"] ||
          purchaseTypeFields["weekly-field"]) &&
        (purchaseTypeSwitches["weekly-switch"]
          ? purchaseTypeFields["weekly-num-field"]
          : true)
      )
    )
      return;

    const contentUploadReqBody = {
      creatorId: formFields.creatorId,
      title: formFields.title,
      description: formFields.description,
      thumbnailUrl: formFields.thumbnailURL,
      transactionId: formFields.transactionID,
      comments: formFields.comments,
      weeks: purchaseTypeSwitches["weekly-switch"]
        ? purchaseTypeFields["weekly-num-field"]
        : undefined,
      seriesId:
        contentTypeSelections.series !== seriesList[0]
          ? seriesData?.find(
              series => series.seriesName === contentTypeSelections.series
            ).seriesID
          : undefined,
      seasonNo:
        contentTypeSelections.season === seasonsList[0]
          ? seasonsList.length
          : contentTypeSelections.season,
      contentUrl:
        contentURLFields?.map(content => ({
          URL: content.URL,
          resolution: content.resolution,
        })) || undefined,
      genres: selectedGenreList,
      cast: castTextFields.map(cast => ({
        role: cast.role,
        name: cast.name,
      })),
      purchaseType: {
        buy: purchaseTypeSwitches["buy-switch"]
          ? purchaseTypeFields["buy-field"]
          : -1,
        rent: purchaseTypeSwitches["rent-switch"]
          ? purchaseTypeFields["rent-field"]
          : -1,
        weekly: purchaseTypeSwitches["weekly-switch"]
          ? purchaseTypeFields["weekly-field"]
          : -1,
      },
    };

    contentUploadReqBody.purchaseType = {
      buy: purchaseTypeSwitches["buy-switch"]
        ? purchaseTypeFields["buy-field"]
        : -1,
      rent: purchaseTypeSwitches["rent-switch"]
        ? purchaseTypeFields["rent-field"]
        : -1,
      weekly: purchaseTypeSwitches["weekly-switch"]
        ? purchaseTypeFields["weekly-field"]
        : -1,
    };

    if (contentTypeSelections.content === contentList[0])
      contentUploadReqBody.action = "create_content";
    else if (contentTypeSelections.series === seriesList[0])
      contentUploadReqBody.action = "create_series";
    else if (contentTypeSelections.season === seasonsList[0])
      contentUploadReqBody.action = "create_season";
    else contentUploadReqBody.action = "create_episode";

    console.log("FORM_SUBMIT: ", contentUploadReqBody);

    triggerContentUploadPostApi([contentUploadReqBody]);
  };

  useEffect(() => {
    const selectedResolutions = contentURLFields.map(
      content => content.resolution
    );
    const updatedContentResolutions = CONTENT_RESOLUTIONS.filter(
      resolution => !selectedResolutions.includes(resolution)
    );
    setAvailableContentResolution(() => updatedContentResolutions);
  }, [contentURLFields]);

  useEffect(() => {
    triggetGetAllSeriesApi();
  }, [triggetGetAllSeriesApi]);

  useEffect(() => {
    if (seriesData)
      setSeriesList(prev => [
        prev[0],
        ...seriesData
          .filter(series => series.creatorID === params.userID)
          .map(series => series.seriesName),
      ]);
  }, [params.userID, seriesData]);

  useEffect(() => {
    setContentTypeSelections(prev => ({ ...prev, series: seriesList[0] }));
  }, [seriesList]);

  useEffect(() => {
    setContentTypeSelections(prev => ({ ...prev, season: seasonsList[0] }));
  }, [seasonsList]);

  useEffect(() => {
    if (seriesData && contentTypeSelections.series) {
      setSeasonsList(prev => {
        const selectedSeries = seriesData?.find(
          series => series.seriesName === contentTypeSelections.series
        );

        const seasons =
          selectedSeries?.seasons.map(season => season.seasonNo) || [];
        return [prev[0], ...seasons];
      });
    }
  }, [contentTypeSelections.series, seriesData, seriesList]);

  useEffect(() => {
    if (contentUploadResData) triggetGetAllSeriesApi();
  }, [contentUploadResData, triggetGetAllSeriesApi]);

  if (contentUploadLoading) return <PageLoader />;

  if (contentUploadError)
    return (
      <PageError message="Opps.. Something went wrong while uploading contents." />
    );

  return (
    <Container maxWidth="md" className={classes.root}>
      <Box p={5} className={classes.formContainer}>
        <Box mb={5}>
          <Typography color="primary" align="center" variant="h3">
            Content Upload
          </Typography>
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="creatorId"
                label="Creator ID"
                variant="filled"
                value={formFields.creatorId}
                className={classes.textField}
                disabled
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="content"
                value={contentTypeSelections.content}
                onChange={handleContentTypeSelectionsChange}
                className={`${classes.selectField} ${classes.textField}`}
                variant="outlined"
                color="primary"
              >
                {contentList.map((content, i) => (
                  <MenuItem
                    key={i}
                    className={classes.selectItem}
                    value={content}
                  >
                    {content}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {contentTypeSelections.content !== contentList[0] && (
              <Grid item xs={12} sm={6}>
                <Select
                  name="series"
                  value={contentTypeSelections.series}
                  onChange={handleContentTypeSelectionsChange}
                  className={`${classes.selectField} ${classes.textField}`}
                  variant="outlined"
                  color="primary"
                >
                  {seriesList.map((series, i) => (
                    <MenuItem
                      key={i}
                      className={classes.selectItem}
                      value={series}
                    >
                      {series}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            {contentTypeSelections.content !== contentList[0] &&
              contentTypeSelections.series &&
              contentTypeSelections.series !== seriesList[0] && (
                <Grid item xs={12} sm={6}>
                  <Select
                    name="season"
                    value={contentTypeSelections.season}
                    onChange={handleContentTypeSelectionsChange}
                    className={`${classes.selectField} ${classes.textField}`}
                    variant="outlined"
                    color="primary"
                  >
                    {seasonsList.map((season, i) => (
                      <MenuItem
                        key={i}
                        className={classes.selectItem}
                        value={season}
                      >
                        {season}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
            <Grid item xs={12} sm={6}>
              <Box pb={2}>
                <TextField
                  name="thumbnailURL"
                  label="Thumbnail URL"
                  variant="outlined"
                  value={formFields.thumbnailURL}
                  onChange={handleFormFieldsChange}
                  className={classes.textField}
                  color="primary"
                  required
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid container></Grid>
              <Grid
                container
                className={classes.contentTitleWithDescriptionContainer}
              >
                <Grid item xs={12}>
                  <Box py={1}>
                    <TextField
                      name="title"
                      label="Title"
                      variant="outlined"
                      value={formFields.title}
                      onChange={handleFormFieldsChange}
                      className={classes.textField}
                      color="primary"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box py={1}>
                    <TextField
                      name="description"
                      label="Description"
                      variant="outlined"
                      value={formFields.description}
                      onChange={handleFormFieldsChange}
                      className={classes.textField}
                      multiline
                      rows={5}
                      rowsMax={8}
                      color="primary"
                      required
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {(contentTypeSelections.content === contentList[0] ||
              (contentTypeSelections.season === seasonsList[0] &&
                contentTypeSelections.series !== seriesList[0])) && (
              <Grid item xs={12} sm={6}>
                <Grid container className={classes.purchaseTypeContainer}>
                  <Grid item xs={12}>
                    <Box mt={0.7} mb={2}>
                      <Typography variant="h5" color="primary">
                        Purchase Type
                      </Typography>
                    </Box>
                  </Grid>

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
                              className={classes.textField}
                              placeholder="In Rupees"
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
                              className={classes.textField}
                              placeholder="In Rupees"
                              required
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                    {contentTypeSelections.content !== "Series" && (
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
                                className={classes.textField}
                                placeholder="In Rupees"
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
                                className={classes.textField}
                                placeholder="In Weeks"
                                required
                              />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          {(contentTypeSelections.content === contentList[0] ||
            contentTypeSelections.season !== seasonsList[0]) && (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box mb={-4}>
                  <Typography color="primary" variant="h5">
                    Content URLs
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {contentURLFields.map((content, index) => (
                  <Box mt={3} p={2} key={`content-url-fields-${index}`}>
                    <Grid
                      container
                      spacing={4}
                      className={classes.castContainer}
                    >
                      <Box className={classes.castRemoveBtnContainer}>
                        <IconButton
                          className={classes.castRemoveBtn}
                          onClick={() =>
                            handleRemoveContentURL(content.fieldID)
                          }
                        >
                          <CloseSharp
                            className={classes.castRemoveIcon}
                            fontSize="small"
                          />
                        </IconButton>
                      </Box>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name={`content-url-${content.fieldID}`}
                          label="URL"
                          variant="outlined"
                          value={content.URL}
                          onChange={handleContentURLFieldsChange}
                          className={classes.textField}
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Select
                          name={`content-resolution-${content.fieldID}`}
                          value={content.resolution || ""}
                          onChange={handleContentURLResolutionChange}
                          className={classes.selectField}
                          variant="outlined"
                          color="primary"
                        >
                          {[
                            ...availableContentResolutions,
                            content.resolution,
                          ].map((resolution, i) => (
                            <MenuItem
                              key={i}
                              className={classes.selectItem}
                              value={resolution}
                            >
                              {resolution}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Box mt={-2}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.castAddBtn}
                    onClick={handleAddContentURL}
                  >
                    Add <AddIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}

          {(contentTypeSelections.content === contentList[0] ||
            contentTypeSelections.series === seriesList[0]) && (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box mb={-4}>
                  <Typography color="primary" variant="h5">
                    Casts
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {castTextFields.map((cast, index) => (
                  <Box mt={3} p={2} key={`cast-fields-${index}`}>
                    <Grid
                      container
                      spacing={4}
                      className={classes.castContainer}
                    >
                      <Box className={classes.castRemoveBtnContainer}>
                        <IconButton
                          className={classes.castRemoveBtn}
                          onClick={() => handleRemoveCast(cast.fieldID)}
                        >
                          <CloseSharp
                            className={classes.castRemoveIcon}
                            fontSize="small"
                          />
                        </IconButton>
                      </Box>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name={`cast-role-${cast.fieldID}`}
                          label="Role"
                          variant="outlined"
                          value={cast.role}
                          onChange={handleCastFieldsChange}
                          className={classes.textField}
                          color="primary"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name={`cast-name-${cast.fieldID}`}
                          label="Name"
                          variant="outlined"
                          value={cast.name}
                          onChange={handleCastFieldsChange}
                          className={classes.textField}
                          color="primary"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Box mt={-2}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.castAddBtn}
                    onClick={handleAddCast}
                  >
                    Add <AddIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}

          {(contentTypeSelections.content === contentList[0] ||
            contentTypeSelections.series === seriesList[0]) && (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box mt={2} mb={-1}>
                  <Typography color="primary" variant="h5">
                    Genres
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box p={2} className={classes.genreContainer}>
                  <Typography>Available Genres</Typography>
                  <Box>
                    {availableGenreList.map((genre, index) => (
                      <GenreButton
                        key={`genre-${index}`}
                        genre={{ name: genre, index: index }}
                        onClick={handleAddGenre}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box p={2} className={classes.genreContainer}>
                  <Typography>Selected Genres</Typography>
                  <Box>
                    {selectedGenreList.map((genre, index) => (
                      <GenreButton
                        key={`genre-${index}`}
                        genre={{ name: genre, index: index }}
                        onClick={handleRemoveGenre}
                        remove
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box mt={2} mb={-1}>
                <Typography variant="h5" color="primary">
                  Additional Info
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box py={1}>
                <TextField
                  name="transactionID"
                  label="Transaction ID"
                  variant="outlined"
                  value={formFields.transactionID}
                  onChange={handleFormFieldsChange}
                  className={classes.textField}
                  color="primary"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box py={1}>
                <TextField
                  name="comments"
                  label="Comments"
                  variant="outlined"
                  value={formFields.comments}
                  onChange={handleFormFieldsChange}
                  className={classes.textField}
                  multiline
                  rows={3}
                  rowsMax={5}
                  color="primary"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item>
              <Box my={4}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default ContentUploadPage;
