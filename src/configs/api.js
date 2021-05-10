const DOMAIN = "http://localhost:3001";

const ENDPOINTS = {
  GET_CONTENT: (contentID) => `${DOMAIN}/contents/${contentID}`,
  GET_CONTENTS: `${DOMAIN}/contents`,
  GET_SERIES_CONTENTS: (seriesID) => `${DOMAIN}/series/${seriesID}/contents`,
  GET_SERIES_INFO: (seriesID) => `${DOMAIN}/series/${seriesID}`,
  GET_SERIES_SEASONS: `${DOMAIN}/series/seasons`,
  GET_HISTORY: (userID) => `${DOMAIN}/history/${userID}`,
  GET_USER_CONTENT_PURCHASES: (userID, contentID) =>
    `${DOMAIN}/user-purchase/${userID}/contents/${contentID}`,
  GET_USER_PURCHASE: (userID) => `${DOMAIN}/user-purchase/${userID}`,
};

export { ENDPOINTS };
