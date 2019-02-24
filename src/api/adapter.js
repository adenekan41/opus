import axios from 'axios';

const BASE_URL_ONE =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_ONE_PRODUCTION
    : process.env.REACT_APP_BASE_URL_ONE_DEVELOPMENT;

export const makeApiCall = async ({
  url,
  method = 'get',
  params,
  data,
  token,
}) => {
  const config = {
    headers: { Authorization: `JWT ${token}` },
    baseURL: BASE_URL_ONE,
    url,
    method,
    params,
    data,
  };
  try {
    const result = await axios(config);
    const { data } = await result;
    return data;
  } catch (error) {
    throw error;
  }
};
const login = payload => {
  return makeApiCall({ url: `/token/login/`, method: 'POST', data: payload });
};

const getUsers = token => {
  return makeApiCall({ url: `/users/`, token });
};

const getProfile = token => {
  return makeApiCall({ url: `/users/me/`, token });
};

export default {
  login,
  getUsers,
  getProfile
};
