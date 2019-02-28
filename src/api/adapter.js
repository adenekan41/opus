import axios from 'axios';

const BASE_URL_ONE =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_ONE_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_ONE_DEVELOPMENT;

const BASE_URL_TWO =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_URL;

export const makeApiCall = async ({
  baseURL = BASE_URL_ONE,
  url,
  method = 'get',
  params,
  data,
  token,
}) => {
  const config = {
    headers: { Authorization: `JWT ${token}` },
    baseURL,
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

const resetPassword = payload => {
  return makeApiCall({
    url: `/auth/password/request/reset/`,
    method: 'POST',
    data: payload,
  });
};

const newPassword = payload => {
  return makeApiCall({
    url: `/auth/password/reset/`,
    method: 'POST',
    data: payload,
  });
};

const getUsers = token => {
  return makeApiCall({ url: `/users/`, token });
};

const getUser = (token, id) => {
  return makeApiCall({ url: `/users/${id}`, token });
};

const createUser = (token, payload) => {
  return makeApiCall({ url: `/users/`, method: 'POST', token, data: payload });
};

const adminCreateUser = (token, payload) => {
  return makeApiCall({
    url: `/users/admins/create/`,
    method: 'POST',
    token,
    data: payload,
  });
};

const patchUser = (token, id, payload) => {
  return makeApiCall({
    url: `/users/${id}/`,
    method: 'PATCH',
    token,
    data: payload,
  });
};

const updateUser = (token, id, payload) => {
  return makeApiCall({
    url: `/users/${id}/`,
    method: 'PUT',
    token,
    data: payload,
  });
};

const deleteUser = (token, id) => {
  return makeApiCall({ url: `/users/${id}`, method: 'DELETE', token });
};

const getProfile = token => {
  return makeApiCall({ url: `/users/me/`, token });
};

const getWhatsappAlerts = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: '/whatsapp', token });
};

const sendWhatsappAlert = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: '/whatsapp',
    token,
    method: 'POST',
    data: payload,
  });
};

export default {
  login,
  getUser,
  getUsers,
  getProfile,
  patchUser,
  updateUser,
  createUser,
  deleteUser,
  newPassword,
  resetPassword,
  adminCreateUser,
  getWhatsappAlerts,
  sendWhatsappAlert,
};
