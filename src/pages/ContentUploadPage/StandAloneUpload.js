import React, { useMemo, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  IconButton,
  Switch,
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
import { CONTENT_GENRES } from "../../configs/app";
import usePostApi from "../../hooks/usePostApi";
import { postContentUpload } from "../../utils/api";

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

function StandAloneUpload() {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const [selectedGenreList, setSelectedGenreList] = useState([]);
  const [availableGenreList, setAvailableGenreList] = useState(CONTENT_GENRES);
  const [purchaseTypeSwitches, setPurchaseTypeSwitches] = useState({
    "buy-switch": true,
    "rent-switch": false,
    "weekly-switch": false,
  });
  const [purchaseTypeFields, setPurchaseTypeFields] = useState({
    "buy-field": "",
    "rent-field": "",
    "weekly-field": "",
  });
  const [formFields, setFormFields] = useState({
    title: "",
    creatorId: params.userID,
    contentURL: "",
    description: "",
    thumbnailURL: "",
  });
  const [castTextFields, setCastTextFields] = useState([
    { fieldID: 0, role: "", name: "" },
  ]);

  const postContentUploadParams = useMemo(() => [], []);

  const {
    // eslint-disable-next-line no-unused-vars
    data: contentUploadResData,
    loading: contentUploadLoading,
    error: contentUploadError,
    triggerPostApi: triggerContentUploadPostApi,
  } = usePostApi(postContentUpload, postContentUploadParams, undefined);

  const handleFormFieldsChange = (event) => {
    setFormFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCastFieldsChange = (event) => {
    if (event.target.name.includes("role")) {
      setCastTextFields((prev) => {
        const fieldIndex = prev.findIndex(
          (castField) => event.target.name === `cast-role-${castField.fieldID}`
        );
        return [
          ...prev.slice(0, fieldIndex),
          { ...prev[fieldIndex], role: event.target.value },
          ...prev.slice(fieldIndex + 1),
        ];
      });
    } else if (event.target.name.includes("name")) {
      setCastTextFields((prev) => {
        const fieldIndex = prev.findIndex(
          (castField) => event.target.name === `cast-name-${castField.fieldID}`
        );
        return [
          ...prev.slice(0, fieldIndex),
          { ...prev[fieldIndex], name: event.target.value },
          ...prev.slice(fieldIndex + 1),
        ];
      });
    }
  };

  const handleFormSubmit = () => {
    const contentUploadReqBody = [
      {
        creatorId: formFields.creatorId,
        title: formFields.title,
        contentUrl: formFields.contentURL,
        description: formFields.description,
        thumbnailUrl: formFields.thumbnailURL,
        cast: castTextFields.map((cast) => ({
          role: cast.role,
          name: cast.name,
        })),
        genres: selectedGenreList,
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
      },
    ];
    triggerContentUploadPostApi(contentUploadReqBody);
  };

  const handleAddCast = () => {
    setCastTextFields((prev) => [
      ...prev,
      { fieldID: prev.length, role: "", name: "" },
    ]);
  };

  const handleRemoveCast = (index) => {
    const updatedCastFields = [
      ...castTextFields.slice(0, index),
      ...castTextFields.slice(index + 1),
    ];

    updatedCastFields.forEach((castField, index) => {
      castField.fieldID = index;
    });

    setCastTextFields(() => updatedCastFields);
  };

  const handleRemoveGenre = (index) => {
    setAvailableGenreList((prev) => [...prev, selectedGenreList[index]]);
    setSelectedGenreList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleAddGenre = (index) => {
    setSelectedGenreList((prev) => [...prev, availableGenreList[index]]);
    setAvailableGenreList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleSwitchChange = (event) => {
    setPurchaseTypeSwitches((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSwitchTextChange = (event) => {
    setPurchaseTypeFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  if (contentUploadLoading) return <PageLoader />;

  if (contentUploadError)
    return (
      <PageError message="Opps.. Something went wrong while subitting upload contents." />
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
              <TextField
                name="contentURL"
                label="Content URL"
                variant="outlined"
                value={formFields.contentURL}
                onChange={handleFormFieldsChange}
                className={classes.textField}
                color="primary"
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
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
                      rows={3}
                      rowsMax={8}
                      color="primary"
                      required
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

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
                    <Grid item xs={8} md={5}>
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

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
                  <Grid container spacing={4} className={classes.castContainer}>
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

export default StandAloneUpload;
