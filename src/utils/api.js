import axios from "axios";
import { ENDPOINTS } from "../configs/api";

export const getContents = () =>
  axios
    .get(ENDPOINTS.GET_CONTENTS, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getContent = (contentID) =>
  axios
    .get(ENDPOINTS.GET_CONTENT(contentID), {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getSeriesContents = (seriesID) =>
  axios
    .get(ENDPOINTS.GET_SERIES_CONTENTS(seriesID), {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getSeries = (seriesID) =>
  axios
    .get(ENDPOINTS.GET_SERIES_INFO(seriesID), {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getAllSeries = () =>
  axios
    .get(ENDPOINTS.GET_ALL_SERIES, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getHistoryData = (userId) => {
  return axios
    .get(ENDPOINTS.GET_USER_PURCHASE(userId), {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const getUserContentPurchases = (userID, contentID) =>
  axios
    .get(ENDPOINTS.GET_USER_CONTENT_PURCHASES(userID, contentID), {
      withCredentials: true,
    })
    .then((res) => res.data);

export const getCreators = () =>
  axios
    .get(ENDPOINTS.GET_CREATORS, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const postDummyApi = (reqBody, contentID) =>
  axios
    .post(`/${contentID}`, reqBody, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const postContentUpload = (reqBody) =>
  axios
    .post(ENDPOINTS.POST_CONTENT_UPLOAD, reqBody, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const postLogin = (data) => {
  return axios
    .post(ENDPOINTS.POST_LOGIN, data, { withCredentials: true })
    .then((res) => {
      return res.data;
    });
};

export const getVerifyUser = () => {
  return axios
    .get(ENDPOINTS.GET_VERIFY_LOGIN, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const postSignup = (data) => {
  return axios
    .post(ENDPOINTS.POST_SIGNUP, data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const postAddCreator = (data) => {
  return axios
    .post(ENDPOINTS.POST_ADD_CREATOR, data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const getLogoutUser = () => {
  return axios
    .get(ENDPOINTS.GET_LOGOUT, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const postCreateOrder = (data) => {
  return axios
    .post(ENDPOINTS.POST_CREATE_ORDER_RAZORPAY, data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const postOrderSuccess = (data) => {
  return axios
    .post(ENDPOINTS.POST_ORDER_SUCCESS, data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const postGetContentsRevenue = (userID, data) => {
  return Promise.resolve([
    {
      contentType: "content",
      creatorId: "abc",
      revenue: "2000",
      purchaseType: "b",
      commission: "0.3",
      contentTitle: "Ugram",
      purchaseCount: "2",
    },
    {
      contentType: "content",
      creatorId: "abc",
      revenue: "3000",
      purchaseType: "r",
      commission: "0.2",
      contentTitle: "Ugram",
      purchaseCount: "4",
    },
    {
      contentType: "series",
      creatorId: "abc",
      revenue: "5000",
      purchaseType: "b",
      commission: "0.3",
      contentTitle: "The Magicians",
      purchaseCount: "1",
    },
  ]);
  return axios
    .post(ENDPOINTS.POST_FETCH_CONTENT_REVENUE(userID))
    .then((res) => res.data);
};

export const getWatchListData = (userId) => {
  return axios
    .get(ENDPOINTS.GET_WATCHLIST_DATA(userId), {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const postAddWatchList = (userId, data) => {
  return axios
    .post(ENDPOINTS.POST_ADD_WATCHLIST_DATA(userId), data, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const deleteRemoveFromWatchlist = (userId, contentId) => {
  return axios
    .delete(ENDPOINTS.DELETE_WATCHLIST_CONTENT(userId, contentId), {
      withCredentials: true,
    })
    .then((res) => res.data);
};
