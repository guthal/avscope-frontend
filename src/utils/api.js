import axios from "axios";
import { ENDPOINTS } from "../configs/api";

export const getContents = () =>
  axios.get(ENDPOINTS.GET_CONTENTS).then((res) => res.data);

export const getContent = (contentID) =>
  axios.get(ENDPOINTS.GET_CONTENT(contentID)).then((res) => res.data);

export const getSeriesContents = (seriesID) =>
  axios.get(ENDPOINTS.GET_SERIES_CONTENTS(seriesID)).then((res) => res.data);

export const getSeries = (seriesID) =>
  axios.get(ENDPOINTS.GET_SERIES_INFO(seriesID)).then((res) => res.data);

export const getSeriesSeasons = () =>
  axios.get(ENDPOINTS.GET_SERIES_SEASONS).then((res) => res.data);

export const getHistoryData = (userId) =>
  axios.get(ENDPOINTS.GET_USER_PURCHASE(userId)).then((res) => res.data);

export const getUserContentPurchases = (userID, contentID) =>
  axios
    .get(ENDPOINTS.GET_USER_CONTENT_PURCHASES(userID, contentID))
    .then((res) => res.data);

export const getCreators = () =>
  axios.get(ENDPOINTS.GET_CREATORS).then((res) => res.data);

export const postDummyApi = (reqBody, contentID) =>
  axios.post(`/${contentID}`, reqBody).then((res) => res.data);
