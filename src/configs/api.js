const DOMAIN = process.env.REACT_APP_DOMAIN;

const ENDPOINTS = {
  GET_CONTENT: contentID => `${DOMAIN}/contents/${contentID}`,
  GET_CONTENTS: `${DOMAIN}/contents`,
  GET_SERIES_CONTENTS: seriesID => `${DOMAIN}/series/${seriesID}/contents`,
  GET_SERIES_INFO: seriesID => `${DOMAIN}/series/${seriesID}`,
  GET_ALL_SERIES: `${DOMAIN}/series`,
  GET_HISTORY: userID => `${DOMAIN}/history/${userID}`,
  GET_USER_CONTENT_PURCHASES: (userID, contentID) =>
    `${DOMAIN}/user-purchase/${userID}/contents/${contentID}`,
  GET_USER_PURCHASE: userID => `${DOMAIN}/user-purchase/${userID}`,
  GET_CREATORS: `${DOMAIN}/creators`,
  POST_CONTENT_UPLOAD: `${DOMAIN}/content-upload`,
  POST_LOGIN: `${DOMAIN}/login`,
  GET_VERIFY_LOGIN: `${DOMAIN}/login/verify`,
  POST_SIGNUP: `${DOMAIN}/register`,
  GET_LOGOUT: `${DOMAIN}/logout`,
  POST_CREATE_ORDER_RAZORPAY: `${DOMAIN}/orders/create`,
  POST_ORDER_SUCCESS: `${DOMAIN}/orders/success`,
  POST_ADD_CREATOR: `${DOMAIN}/fm-register`,
  POST_FETCH_CONTENT_REVENUE: `${DOMAIN}/revenue/`,
  GET_WATCHLIST_DATA: userId => `${DOMAIN}/watchlist/${userId}`,
  POST_ADD_WATCHLIST_DATA: userId => `${DOMAIN}/watchlist/${userId}`,
  DELETE_WATCHLIST_CONTENT: (userId, contentId) =>
    `${DOMAIN}/watchlist/${userId}/content/${contentId}`,
};

export { ENDPOINTS };
