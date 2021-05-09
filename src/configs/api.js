const DOMAIN = "http://localhost:3001";

const ENDPOINTS = {
  GET_CONTENT: (contentID) => `${DOMAIN}/contents/${contentID}`,
  GET_CONTENTS: `${DOMAIN}/contents`,
};

export { ENDPOINTS };
