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
  GET_GOOGLE_LOGIN: `${DOMAIN}/auth/google`,
  POST_DoB_GENDER_ENTRY: `${DOMAIN}/google-login/doB-gender`,
  GET_FACEBOOK_LOGIN: `${DOMAIN}/auth/facebook`,
  GET_VERIFY_LOGIN: `${DOMAIN}/login/verify`,
  POST_SIGNUP: `${DOMAIN}/register`,
  GET_VERIFY_EMAIL: userID => `${DOMAIN}/register/verify/${userID}`,
  POST_FORGOT_PASSWORD: `${DOMAIN}/forgot`,
  POST_RESET_PASSWORD: userID => `${DOMAIN}/forgot/reset/${userID}`,
  GET_LOGOUT: `${DOMAIN}/logout`,
  POST_CREATE_ORDER_RAZORPAY: `${DOMAIN}/orders/create`,
  POST_ORDER_SUCCESS: `${DOMAIN}/orders/success`,
  POST_CREATE_SUPPORT_US_RAZORPAY: `${DOMAIN}/support/create`,
  POST_SUPPORT_US_PAYMENT_SUCCESS: `${DOMAIN}/support/success`,
  POST_ADD_CREATOR: `${DOMAIN}/fm-register`,
  POST_FETCH_CONTENT_REVENUE: `${DOMAIN}/revenue`,
  GET_WATCHLIST_DATA: userID => `${DOMAIN}/watchlist/${userID}`,
  POST_ADD_WATCHLIST_DATA: userID => `${DOMAIN}/watchlist/${userID}`,
  DELETE_WATCHLIST_CONTENT: (userID, contentID) =>
    `${DOMAIN}/watchlist/${userID}/content/${contentID}`,
  POST_PRODUCT_STATUS: productID =>
    `${DOMAIN}/conversion/availability/${productID}`,
  POST_PAY_CREATOR_EARNINGS: userID => `${DOMAIN}/pay-creator/${userID}`,
  POST_PRODUCT_CONVERSION: contentID => `${DOMAIN}/conversion/${contentID}`,
  GET_LAST_PAY_DATE: creatorID => `${DOMAIN}/account/last-pay/${creatorID}`,
  GET_STATIC_PAGE: type => `${DOMAIN}/static/${type}`,
  POST_CONTENT_REVENUE: `${DOMAIN}/revenue/summary`,
  POST_REVENUE_INVOICE: `${DOMAIN}/revenue/invoice`,
};

export { ENDPOINTS };
