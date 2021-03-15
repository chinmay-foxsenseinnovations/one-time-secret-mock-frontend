import HttpConstants from '../constants/HttpConstants';
import axios from 'axios';

const makeApiCall = (url, httpMethod, data = {}) => {
  url = process.env.REACT_APP_BACKEND_ENDPOINT + url;
  switch (httpMethod) {
    case HttpConstants.GET_METHOD:
      return axios.get(url, data).catch((err) => err.response);
    case HttpConstants.DELETE_METHOD:
      return axios.delete(url).catch((err) => err.response);
    case HttpConstants.POST_METHOD:
      return axios.post(url, data).catch((err) => err.response);
    default:
      throw new Error('No HTTP Method found');
  }
};

export default { makeApiCall };
