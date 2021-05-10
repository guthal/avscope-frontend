const DOMAIN = "http://localhost:3001";

const ENDPOINTS = {
  GET_CONTENT: (contentID) => `${DOMAIN}/contents/${contentID}`,
  GET_CONTENTS: `${DOMAIN}/contents`,
  GET_SERIES_CONTENTS: (seriesID) => `${DOMAIN}/series/${seriesID}/contents`,
  GET_HISTORY: (userID) => `${DOMAIN}/history/${userID}`,
  GET_USER_CONTENT_PURCHASES: (userID, contentID) =>
    `${DOMAIN}/user-purchase/${userID}/contents/${contentID}`,
};

export { ENDPOINTS };
