import axios from "axios";
import { ENDPOINTS } from "../configs/api";

export const getContents = () =>
  axios
    .get(ENDPOINTS.GET_CONTENTS, {
      withCredentials: true,
    })
    .then(res => res.data);

export const getContent = contentID =>
  axios
    .get(ENDPOINTS.GET_CONTENT(contentID), {
      withCredentials: true,
    })
    .then(res => res.data);

export const getSeriesContents = seriesID =>
  axios
    .get(ENDPOINTS.GET_SERIES_CONTENTS(seriesID), {
      withCredentials: true,
    })
    .then(res => res.data);

export const getSeries = seriesID =>
  axios
    .get(ENDPOINTS.GET_SERIES_INFO(seriesID), {
      withCredentials: true,
    })
    .then(res => res.data);

export const getAllSeries = () =>
  axios
    .get(ENDPOINTS.GET_ALL_SERIES, {
      withCredentials: true,
    })
    .then(res => res.data);

export const getHistoryData = userId =>
  axios
    .get(ENDPOINTS.GET_USER_PURCHASE(userId), {
      withCredentials: true,
    })
    .then(res => res.data);

export const getUserContentPurchases = (userID, contentID) =>
  axios
    .get(ENDPOINTS.GET_USER_CONTENT_PURCHASES(userID, contentID), {
      withCredentials: true,
    })
    .then(res => res.data);

export const getCreators = () =>
  axios
    .get(ENDPOINTS.GET_CREATORS, {
      withCredentials: true,
    })
    .then(res => res.data);

export const postDummyApi = (reqBody, contentID) =>
  axios
    .post(`/${contentID}`, reqBody, {
      withCredentials: true,
    })
    .then(res => res.data);

export const postContentUpload = reqBody =>
  axios
    .post(ENDPOINTS.POST_CONTENT_UPLOAD, reqBody, {
      withCredentials: true,
    })
    .then(res => res.data);

export const postLogin = data => {
  return axios
    .post(ENDPOINTS.POST_LOGIN, data, { withCredentials: true })
    .then(res => {
      return res.data;
    });
};

export const getVerifyUser = () => {
  return axios
    .get(ENDPOINTS.GET_VERIFY_LOGIN, {
      withCredentials: true,
    })
    .then(res => res.data);
};

export const postSignup = data => {
  return axios
    .post(ENDPOINTS.POST_SIGNUP, data, {
      withCredentials: true,
    })
    .then(res => res.data);
};

export const postAddCreator = data => {
  return axios
    .post(ENDPOINTS.POST_ADD_CREATOR, data, {
      withCredentials: true,
    })
    .then(res => res.data);
};

export const getLogoutUser = () => {
  return axios
    .get(ENDPOINTS.GET_LOGOUT, {
      withCredentials: true,
    })
    .then(res => res.data);
};

export const postCreateOrder = data => {
  return axios
    .post(ENDPOINTS.POST_CREATE_ORDER_RAZORPAY, data, {
      withCredentials: true,
    })
    .then(res => res.data);
};

export const postOrderSuccess = data => {
  return axios
    .post(ENDPOINTS.POST_ORDER_SUCCESS, data, {
      withCredentials: true,
    })
    .then(res => res.data);
};
