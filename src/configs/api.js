const DOMAIN = "http://localhost:3001";

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
  POST_SIGNUP: `${DOMAIN}/register`,
  GET_LOGOUT: `${DOMAIN}/logout`,
  POST_CREATE_ORDER_RAZORPAY: `${DOMAIN}/orders/create`,
  POST_ORDER_SUCCESS: `${DOMAIN}/orders/success`,
};

export { ENDPOINTS };
