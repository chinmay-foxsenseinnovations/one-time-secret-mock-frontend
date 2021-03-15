const generateUrlForFrontend = (endpoint) => {
  return process.env.REACT_APP_FRONTEND_ENDPOINT + endpoint;
};

export default { generateUrlForFrontend };
