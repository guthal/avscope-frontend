const DOMAIN = "http://localhost:8000";

const ENDPOINTS = {
  GET_CONTENT: (contentID) => `${DOMAIN}/contents/${contentID}`,
  GET_CONTENTS: `${DOMAIN}/contents`,
  GET_SERIES_CONTENTS: (seriesID) => `${DOMAIN}/series/${seriesID}/contents`,
  GET_HISTORY: (userID) => `${DOMAIN}/history/${userID}`,
  GET_USER_CONTENT_PURCHASES: (userID, contentID) =>
    `${DOMAIN}/user-purchase/${userID}/contents/${contentID}`,
  GET_USER_PURCHASE: (userID) => `${DOMAIN}/user-purchase/${userID}`,

  // Content Expiry Consts
  RENT_EXPIRY_DAYS: 30,
  WEEKLY_EXPIRY_HOURS: 6,
};

export { ENDPOINTS };
