const DOMAIN = "http://avscope.in";

const ENDPOINTS = {
  GET_CONTENT: (contentID) => `${DOMAIN}/contents/${contentID}`,
  GET_CONTENTS: `${DOMAIN}/contents`,
};

export { ENDPOINTS };
