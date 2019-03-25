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
  headers = { Authorization: `JWT ${token}` },
}) => {
  const config = {
    headers,
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
  let encryt = `${payload.email}:${payload.password}`;
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/token/`,
    method: 'POST',
    data: payload,
    headers: {
      Authorization: `Basic ${btoa(encryt)}`,
    },
  });
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

const patchUser = (token, payload) => {
  return makeApiCall({
    url: `/users/${payload.id}/`,
    method: 'PATCH',
    token,
    data: payload,
  });
};

const updateUser = (token, payload) => {
  return makeApiCall({
    url: `/users/${payload.id}/`,
    method: 'PUT',
    token,
    data: payload,
  });
};

const deleteUser = (token, id) => {
  return makeApiCall({ url: `/users/${id}`, method: 'DELETE', token });
};

const getContacts = token => {
  return makeApiCall({ url: `/contacts/`, token, baseURL: BASE_URL_TWO });
};

const getContact = (token, id) => {
  return makeApiCall({ url: `/contacts/${id}`, token, baseURL: BASE_URL_TWO });
};

const createContact = (token, payload) => {
  return makeApiCall({
    url: `/contacts/`,
    method: 'POST',
    token,
    data: payload,
    baseURL: BASE_URL_TWO,
  });
};

const updateContact = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/contacts/${payload.id}/`,
    method: 'PUT',
    token,
    data: payload,
  });
};

const deleteContact = (token, id) => {
  return makeApiCall({
    url: `/contacts/${id}`,
    method: 'DELETE',
    token,
    baseURL: BASE_URL_TWO,
  });
};

const getProfile = token => {
  return makeApiCall({ url: `/users/me/`, token });
};

const getWhatsappAlerts = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: '/whatsapp/', token });
};

const sendWhatsappAlert = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: '/whatsapp/',
    token,
    method: 'POST',
    data: payload,
  });
};

const getWeatherForecastLogs = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: '/earthnetworks/', token });
};

const getWeatherForecast = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: '/earthnetworks/',
    token,
    method: 'POST',
    data: payload,
  });
};

const getCrops = token => {
  return makeApiCall({ url: `/crops/`, token });
};

const getWeatherData = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: `/weatherlink/`, token });
};

const getWeatherStationCurrentData = (token, station_name="") => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/readings-from-${station_name.toLowerCase()}/`,
    token,
  });
};

const getWeatherStationData = (token, station_name="") => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/${station_name}/`,
    token,
  });
};

const exportWeatherData = token => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/export/`,
    token,
  });
};

export default {
  login,
  getUser,
  getCrops,
  getUsers,
  getProfile,
  patchUser,
  updateUser,
  createUser,
  deleteUser,
  newPassword,
  resetPassword,
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  adminCreateUser,
  getWhatsappAlerts,
  sendWhatsappAlert,
  getWeatherForecast,
  getWeatherForecastLogs,
  getWeatherData,
  getWeatherStationData,
  exportWeatherData,
  getWeatherStationCurrentData
};
