import axios from "axios";
import { formatDate } from "../helpers/functions";

const BASE_URL_TWO =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL_PRODUCTION
    : process.env.REACT_APP_BASE_URL;

export const makeApiCall = async ({
  baseURL = BASE_URL_TWO,
  url,
  method = "get",
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
    method: "POST",
    data: payload,
    headers: {
      Authorization: `Basic ${btoa(encryt)}`,
    },
  });
};

const resetPassword = payload => {
  return makeApiCall({
    url: `/auth/password/request/reset/`,
    method: "POST",
    data: payload,
  });
};

const newPassword = payload => {
  return makeApiCall({
    url: `/auth/password/reset/`,
    method: "POST",
    data: payload,
  });
};

const getProfile = token => {
  return makeApiCall({ url: `/profile/`, token });
};

const updateProfile = (token, payload) => {
  return makeApiCall({ url: `/profile/`, token, method: "PUT", data: payload });
};

const getUsers = token => {
  return makeApiCall({ url: `/user/`, token });
};

const getUser = (token, id) => {
  return makeApiCall({ url: `/user/${id}`, token });
};

const createUser = (token, payload) => {
  return makeApiCall({ url: `/user/`, method: "POST", token, data: payload });
};

const adminCreateUser = (token, payload) => {
  return makeApiCall({
    url: `/user`,
    method: "POST",
    token,
    data: { ...payload, is_admin: true },
  });
};

const patchUser = (token, payload) => {
  return makeApiCall({
    url: `/user/${payload.id}/`,
    method: "PATCH",
    token,
    data: payload,
  });
};

const updateUser = (token, payload) => {
  return makeApiCall({
    url: `/user/${payload.id}/`,
    method: "PUT",
    token,
    data: payload,
  });
};

const deleteUser = (token, id) => {
  return makeApiCall({ url: `/user/${id}`, method: "DELETE", token });
};

const searchUsers = (token, search) => {
  return makeApiCall({ url: `/user/`, params: { search }, token });
};

const setNewUserPassword = payload => {
  return makeApiCall({
    url: `/password/set`,
    data: payload,
    method: "POST",
    headers: {},
  });
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
    method: "POST",
    token,
    data: payload,
    baseURL: BASE_URL_TWO,
  });
};

const updateContact = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/contacts/${payload.id}/`,
    method: "PUT",
    token,
    data: payload,
  });
};

const deleteContact = (token, id) => {
  return makeApiCall({
    url: `/contacts/${id}`,
    method: "DELETE",
    token,
    baseURL: BASE_URL_TWO,
  });
};

const searchContacts = (token, search) => {
  return makeApiCall({ url: `/contacts/`, params: { search }, token });
};

const getWhatsappAlerts = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: "/whatsapp/", token });
};

const sendWhatsappAlert = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: "/whatsapp/",
    token,
    method: "POST",
    data: payload,
  });
};

const getWeatherForecastLogs = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: "/earthnetworks/", token });
};

const getWeatherForecast = (token, payload) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: "/earthnetworks/",
    token,
    method: "POST",
    data: payload,
  });
};

const getCrops = token => {
  return makeApiCall({ url: `/crops/`, token });
};

const getWeatherData = token => {
  return makeApiCall({ baseURL: BASE_URL_TWO, url: `/weatherlink/`, token });
};

const getWeatherStationCurrentData = (token, station_name = "") => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/${station_name.toLowerCase()}/`,
    token,
  });
};

const getWeatherStationData = (token, station_name, start_date, end_date) => {
  return makeApiCall({
    method: "POST",
    data: {
      station_name,
      start: start_date,
      end: end_date,
    },
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/historical-data/`,
    token,
  });
};

const getAllWeatherStationData = (token, station_name = "") => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/${station_name}/`,
    token,
  });
};

const exportWeatherData = (token, station_name, start_date, end_date) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/export/`,
    token,
    method: "POST",
    data: {
      station: station_name,
      start_date: formatDate(start_date, "M/D/YYYY"),
      end_date: formatDate(end_date, "M/D/YYYY"),
    },
  });
};

const exportCompareData = (
  token,
  station_names,
  weather_type,
  start_date,
  end_date
) => {
  return makeApiCall({
    baseURL: BASE_URL_TWO,
    url: `/weatherlink/compared/`,
    token,
    method: "POST",
    data: {
      station_names,
      weather_type,
      start_date: formatDate(start_date, "M/D/YYYY"),
      end_date: formatDate(end_date, "M/D/YYYY"),
    },
  });
};

const getAssets = (token) => {
  return makeApiCall({
    url: `/asset/`,
    token,
  })
}

const createAsset = (token, data) => {
  return makeApiCall({
    url: `/asset/`,
    token,
    data,
    method: "POST"
  })
}

const updateAsset = (token, data) => {
  return makeApiCall({
    url: `/asset/${data.id}/`,
    token,
    data,
    method: "PUT"
  })
}

const deleteAsset = (token, id) => {
  return makeApiCall({
    url: `/asset/${id}`,
    token,
    method: "DELETE"
  })
}

const searchAssets = (token, search) => {
  return makeApiCall({ url: `/asset/`, params: { search }, token });
};

export default {
  login,
  getUser,
  getCrops,
  getUsers,
  getProfile,
  updateProfile,
  patchUser,
  updateUser,
  createUser,
  deleteUser,
  searchUsers,
  newPassword,
  resetPassword,
  getContacts,
  getContact,
  searchContacts,
  createContact,
  updateContact,
  deleteContact,
  adminCreateUser,
  getWhatsappAlerts,
  sendWhatsappAlert,
  getWeatherForecast,
  setNewUserPassword,
  getWeatherForecastLogs,
  getWeatherData,
  getWeatherStationData,
  exportWeatherData,
  exportCompareData,
  getAllWeatherStationData,
  getWeatherStationCurrentData,
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
  searchAssets
};
