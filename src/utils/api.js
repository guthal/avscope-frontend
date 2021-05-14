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

export const getAllSeries = () =>
  axios.get(ENDPOINTS.GET_ALL_SERIES).then((res) => res.data);

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

export const postContentUpload = (reqBody) =>
  axios.post(ENDPOINTS.POST_CONTENT_UPLOAD, reqBody).then((res) => res.data);

export const postLogin = (email, password) => {
  return axios
    .post("/login", {
      email,
      password,
    })
    .then((res) => res.data);
};

export const postSignup = (firstName, lastName, email, phone, password) => {
  return axios
    .post("/signup", {
      firstName,
      lastName,
      email,
      phone,
      password,
    })
    .then((res) => res.data);
};
