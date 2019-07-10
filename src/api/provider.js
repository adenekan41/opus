import uniqBy from "lodash.uniqby";
import moment from "moment";
import React from "react";
import toaster from "../components/Toaster";
import { compareTypeData, formatDate, getUserWeatherStations, weatherTypeData } from "../helpers/functions";
import { clearState, loadState, saveState } from "../localStorage";
import { ACTIONS } from "./actions";
import adapter from "./adapter";
import { DataContext } from "./context";

export class DataProvider extends React.Component {
  static defaultProps = {
    adapter,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      map: null,
      users: [],
      crops: [],
      alerts: [],
      assets: [],
      formattedAssets: [],
      contacts: [],
      fetching: false,
      weatherStation: {},
      weatherStations: [],
      type: "Temperature",
      weatherStationLogs: [],
      compareStationLogs: [],
      observationTimes: [],
      compareStationCsvData: [],
      compareType: "Temperature",
      profile: {},
      weatherStationsList: [],
      ...this.loadTokenFromStorage(),
    };
    this.state.context = {
      state: this.state,
      updateState: this.updateState,
      getUsers: this.getUsers,
      clearAllState: this.clearAllState,
      dispatch: this.dispatch,
      actions: ACTIONS,
    };
  }

  componentDidMount() {
    const { token } = this.state;
    this.updateState({ fetching: true });
    this.initialize({ token }).then(() => {
      saveState({
        ...loadState(),
        auth: { ...loadState().auth },
      });
      this.updateState({ fetching: false });
    });
  }

  loadTokenFromStorage = () => {
    let auth =
      (loadState() || { auth: { token: "" } } || { auth: { token: "" } })
        .auth || "";
    if (!this.props.token) {
      return { token: auth.token, opus1_token: auth.opus1_token };
    } else {
      return { token: this.props.token, opus1_token: this.props.opus1_token };
    }
  };

  initialize = tokens => {
    let { token } = tokens;
    return this.getProfile(token).then(data => {
      const userProfile = data;
      if (userProfile.is_admin || userProfile.is_superuser) {
        return Promise.all([
          this.getUsers(token),
          this.getWeatherData(token, userProfile),
          this.getAssets(token),
          this.getContacts({ token }),
          this.getWeatherStations(token),
        ]).then(response => {
          return {
            profile: userProfile,
            users: response[0],
            weatherStations: data[1],
            assets: data[2],
            contacts: data[3],
            weatherStationsList: data[4],
          };
        });
      }
      if (userProfile.is_customer) {
        return Promise.all([
          this.getWeatherData(token, userProfile),
          this.getContacts({ token }),
          this.getAssets(token),
          this.getWeatherStations(token),
        ]).then(response => {
          return {
            profile: userProfile,
            weatherStations: data[0],
            contacts: response[1],
            assets: response[2],
            weatherStationsList: data[3],
          };
        });
      }
    });
  };

  dispatch = ({ type, value }) => {
    let options = {
      [ACTIONS.INITIALIZE]: this.initialize,
      [ACTIONS.GET_USERS]: this.getUsers,
      [ACTIONS.GET_PROFILE]: this.getProfile,
      [ACTIONS.GET_USER]: this.getUser,
      [ACTIONS.CREATE_USER]: this.createUser,
      [ACTIONS.ADMIN_CREATE_USER]: this.adminCreateUser,
      [ACTIONS.UPDATE_USER]: this.updateUser,
      [ACTIONS.PATCH_USER]: this.patchUser,
      [ACTIONS.DELETE_USER]: this.deleteUser,
      [ACTIONS.SEARCH_USERS]: this.searchUsers,
      [ACTIONS.GET_WHATSAPP_ALERTS]: this.getWhatsappAlerts,
      [ACTIONS.SEND_WHATSAPP_ALERT]: this.sendWhatsappAlert,
      [ACTIONS.GET_CONTACTS]: this.getContacts,
      [ACTIONS.GET_CONTACT]: this.getContact,
      [ACTIONS.CREATE_CONTACT]: this.createContact,
      [ACTIONS.UPDATE_CONTACT]: this.updateContact,
      [ACTIONS.DELETE_CONTACT]: this.deleteContact,
      [ACTIONS.SEARCH_CONTACTS]: this.searchContacts,
      [ACTIONS.GET_WEATHER_FORECAST_LOGS]: this.getWeatherForecastLogs,
      [ACTIONS.GET_WEATHER_DATA]: this.getWeatherData,
      [ACTIONS.UPDATE_WEATHER_STATION_DATA]: this.updateWeatherStationData,
      [ACTIONS.EXPORT_WEATHER_DATA]: this.exportWeatherData,
      [ACTIONS.GET_WEATHER_STATION_DATA]: this.getWeatherStationData,
      [ACTIONS.FILTER_WEATHER_DATA_BY_DATE]: this.filterWeatherLogByDate,
      [ACTIONS.FILTER_WEATHER_DATA_BY_TYPE]: this.filterWeatherLogByType,
      [ACTIONS.UPDATE_WEATHER_TYPE]: this.updateWeatherType,
      [ACTIONS.CLEAR_WEATHER_LOGS]: this.clearWeatherLogs,
      [ACTIONS.GET_COMPARE_STATION_DATA]: this.getCompareStationData,
      [ACTIONS.REMOVE_COMPARE_STATION_DATA]: this.removeCompareStationData,
      [ACTIONS.FILTER_COMPARE_LOGS_BY_TYPE]: this.filterCompareLogByType,
      [ACTIONS.EXPORT_COMPARE_DATA_CSV]: this.exportCompareData,
      [ACTIONS.SET_WINDY_MAP]: this.setWindyMap,
      [ACTIONS.CLEAR_COMPARE_LOGS]: this.clearComparelogs,
      [ACTIONS.UPDATE_PROFILE]: this.updateProfile,
      [ACTIONS.GET_ASSETS]: this.getAssets,
      [ACTIONS.CREATE_ASSET]: this.createAsset,
      [ACTIONS.UPDATE_ASSET]: this.updateAsset,
      [ACTIONS.DELETE_ASSET]: this.deleteAsset,
      [ACTIONS.SEARCH_ASSETS]: this.searchAssets,
      [ACTIONS.GET_WEATHER_STATIONS]: this.getWeatherStations,
      [ACTIONS.CREATE_WEATHER_STATION]: this.createWeatherStation,
      [ACTIONS.UPDATE_WEATHER_STATION]: this.updateWeatherStation,
      [ACTIONS.DELETE_WEATHER_STATION]: this.deleteWeatherStation,
    };
    console.log({ type });
    return options[type](value);
  };

  updateState = (state, callback = () => {}) => {
    let { context, ...rest } = this.state;
    let defaults = { ...rest, ...state };

    defaults.context = { ...context, state: defaults };

    this.setState(defaults, () => {
      callback();
    });
  };

  getAdapter = () => {
    return this.props.adapter;
  };

  clearAllState = () => {
    this.setState({
      user: {},
      map: null,
      users: [],
      crops: [],
      alerts: [],
      assets: [],
      formattedAssets: [],
      contacts: [],
      fetching: false,
      weatherStation: {},
      weatherStations: [],
      type: "Temperature",
      weatherStationLogs: [],
      compareStationLogs: [],
      observationTimes: [],
      compareStationCsvData: [],
      compareType: "Temperature",
      profile: {},
    });
    clearState();
  };

  getProfile = token => {
    let { profile = {} } = this.state;

    if (Object.values(profile).length > 0) {
      return new Promise(resolve => resolve(profile));
    }

    return this.getAdapter()
      .getProfile(token)
      .then(data => {
        this.updateState({
          profile: data,
        });
        return data;
      });
  };

  updateProfile = payload => {
    let { token } = this.state;

    return this.getAdapter()
      .updateProfile(token, payload)
      .then(data => {
        this.updateState({ profile: data });
        return data;
      });
  };

  getUsers = token => {
    let { users = [] } = this.state;

    if (users.length > 0) {
      return new Promise(resolve => resolve(users));
    }
    return this.getAdapter()
      .getUsers(token)
      .then(data => {
        const { results } = data;
        this.updateState({
          users: results,
        });
        return results;
      });
  };

  getUser = id => {
    let { token } = this.state;

    return this.getAdapter()
      .getUser(token, id)
      .then(data => {
        this.updateState({
          user: data,
        });
        return data;
      });
  };

  createUser = payload => {
    let { token, users } = this.state;

    return this.getAdapter()
      .createUser(token, payload)
      .then(data => {
        this.updateState({ users: [data, ...users] });
        return data;
      });
  };

  adminCreateUser = payload => {
    let { token, users } = this.state;

    return this.getAdapter()
      .adminCreateUser(token, payload)
      .then(data => {
        this.updateState({ users: [data, ...users] });
        return data;
      });
  };

  updateUser = payload => {
    let { token, users } = this.state;

    return this.getAdapter()
      .updateUser(token, payload)
      .then(data => {
        let result = users.map(user => {
          if (user.id === payload.id) {
            return data;
          }
          return user;
        });
        this.updateState({ users: result });
        return data;
      });
  };

  patchUser = payload => {
    let { token, users } = this.state;

    return this.getAdapter()
      .patchUser(token, payload)
      .then(data => {
        let result = users.map(user => {
          if (user.id === payload.id) {
            return data;
          }
          return user;
        });
        this.updateState({ users: result });
        return data;
      });
  };

  deleteUser = id => {
    let { token, users } = this.state;

    return this.getAdapter()
      .deleteUser(token, id)
      .then(data => {
        let result = users.filter(user => user.id !== id);
        this.updateState({ users: result });
        return data;
      });
  };

  searchUsers = search => {
    let { token } = this.state;

    return this.getAdapter()
      .searchUsers(token, search)
      .then(data => {
        const { results } = data;
        this.updateState({
          users: results,
        });
        return results;
      });
  };

  getWhatsappAlerts = () => {
    let { token, alerts } = this.state;

    if (alerts.length > 0) {
      return new Promise(resolve => resolve({ alerts }));
    }

    return this.getAdapter()
      .getWhatsappAlerts(token)
      .then(data => {
        this.updateState({ alerts: data });
        return data;
      });
  };

  sendWhatsappAlert = payload => {
    let { token, alerts } = this.state;
    let { phone_number, message, type } = payload;

    return this.getAdapter()
      .sendWhatsappAlert(token, payload)
      .then(data => {
        let result = [
          ...alerts,
          {
            phone_number,
            message,
            type,
            created_at: moment(new Date()).format(),
          },
        ];
        this.updateState({ alerts: result });
        return data;
      });
  };

  getContacts = ({ token, refresh = false }) => {
    let { contacts = [] } = this.state;

    if (refresh) {
      return this.getAdapter()
        .getContacts(token)
        .then(data => {
          this.updateState({
            contacts: data,
          });
          return data;
        });
    }

    if (contacts.length > 0) {
      return new Promise(resolve => resolve(contacts));
    }

    return this.getAdapter()
      .getContacts(token)
      .then(data => {
        this.updateState({
          contacts: data,
        });
        return data;
      });
  };

  getContact = id => {
    let { token } = this.state;

    return this.getAdapter()
      .getContact(token, id)
      .then(data => {
        return data;
      });
  };

  createContact = payload => {
    let { token, contacts } = this.state;

    return this.getAdapter()
      .createContact(token, payload)
      .then(data => {
        this.updateState({ contacts: [data, ...contacts] });
        return data;
      });
  };

  updateContact = payload => {
    let { token, contacts } = this.state;

    return this.getAdapter()
      .updateContact(token, payload)
      .then(data => {
        let result = contacts.map(contact => {
          if (contact.id === payload.id) {
            return data;
          }
          return contact;
        });
        this.updateState({ contacts: result });
        return result;
      });
  };

  deleteContact = id => {
    let { token, contacts } = this.state;

    return this.getAdapter()
      .deleteContact(token, id)
      .then(data => {
        let result = contacts.filter(user => user.id !== id);
        this.updateState({ contacts: result });
        return data;
      });
  };

  searchContacts = search => {
    let { token } = this.state;

    return this.getAdapter()
      .searchContacts(token, search)
      .then(data => {
        this.updateState({
          contacts: data,
        });
        return data;
      });
  };

  getWeatherForecastLogs = () => {
    let { token } = this.state;

    return this.getAdapter()
      .getWeatherForecastLogs(token)
      .then(data => data);
  };

  getCrops = token => {
    let { crops } = this.state;

    if (crops.length > 0) {
      return new Promise(resolve => resolve({ crops }));
    }

    return this.getAdapter()
      .getCrops(token)
      .then(data => {
        this.updateState({ crops: data });
        return data;
      });
  };

  getWeatherData = (token, profile) => {
    let { weatherStations } = this.state;

    if (profile.is_admin || profile.is_superuser) {
      if (weatherStations.length > 0) {
        return Promise(resolve => resolve({ weatherStations }));
      }

      return this.getAdapter()
        .getWeatherData(token)
        .then(data => {
          this.updateState({ weatherStations: data });
          return data;
        });
    }

    if (profile.is_customer) {
      if (weatherStations.length > 0) {
        return Promise(resolve => resolve({ weatherStations }));
      }

      return this.getAdapter()
        .getWeatherData(token)
        .then(data => {
          let weatherLinkStations = data;
          let userWeatherStations = profile.weather_stations;
          let weatherStations = getUserWeatherStations(
            userWeatherStations,
            weatherLinkStations
          );
          this.updateState({ weatherStations });
          return weatherStations;
        });
    }
  };

  updateWeatherStationData = station_name => {
    let { weatherStations } = this.state;
    let weatherStation = weatherStations.find(
      weatherStation => weatherStation.station_name === station_name
    );

    this.updateState({ weatherStation });
    this.getWeatherStationData(station_name);

    let promise = new Promise(resolve => resolve({ weatherStation }));
    return promise;
  };

  getWeatherStationData = ({ station_name, start_date, end_date }) => {
    let { token } = this.state;

    if (start_date && end_date) {
      return this.getAdapter()
        .getWeatherStationData(token, station_name, start_date, end_date)
        .then(data => {
          this.updateState({ weatherStationLogs: data });
          return data;
        });
    }
  };

  filterWeatherLogByDate = values => {
    let { startDate, endDate, station_name } = values;
    let start_date = moment(startDate).format("M/D/YYYY");
    let end_date = moment(endDate).format("M/D/YYYY");

    return this.getWeatherStationData({
      station_name,
      start_date,
      end_date,
    }).then(data => {
      return data;
    });
  };

  filterWeatherLogByType = value => {
    let { type, startDate, endDate, station_name } = value;
    if (type) {
      this.updateWeatherType(type);
      let result = [];
      let weatherStationLogs = [];
      return this.filterWeatherLogByDate({
        startDate,
        endDate,
        station_name,
      }).then(data => {
        weatherStationLogs = data;
        let observationTimes = weatherStationLogs.map(value =>
          formatDate(value.observation_time, "DD/MM")
        );
        weatherTypeData[type].forEach(item => {
          result.push(weatherStationLogs.map(value => value[item]));
        });
        return { result, observationTimes };
      });
    }
  };

  getCompareStationData = payload => {
    let { token } = this.state;
    let stations = [];

    return this.getAdapter()
      .getCompareWeatherStationData(token, payload)
      .then(data => {
        payload.station_names.forEach(station => {
          let stationData = data.filter(item => item.station_name === station);
          stations.push({ station, data: stationData });
        });
        this.updateState({ compareStationLogs: stations });
        let observationTimes =
          stations &&
          stations[0] &&
          stations[0].data &&
          stations[0].data.map(value =>
            moment(value.observation_time).format("DD/MM")
          );
        if (observationTimes && observationTimes.length > 0) {
          this.updateState({ observationTimes });
          return { stations, observationTimes: observationTimes || [] };
        }
        return {
          stations,
          observationTimes: this.state.observationTimes || [],
        };
      });
  };

  removeCompareStationData = station => {
    let { compareStationLogs } = this.state;
    let newData = compareStationLogs.filter(item => item.station !== station);
    this.updateState({
      compareStationLogs: newData,
    });

    return new Promise(resolve => resolve({ compareStationLogs: newData }));
  };

  filterCompareLogByType = type => {
    let { compareStationLogs } = this.state;
    if (type) {
      let result = [];
      this.updateState({
        compareType: type,
      });
      compareTypeData[type].forEach(item => {
        result = compareStationLogs
          ? compareStationLogs.map(({ station, data }) => ({
              station,
              data: data.map(value => value[item]),
            }))
          : [];
      });
      return result;
    } else {
      toaster.error("Please select weather type to compare");
    }
  };

  updateWeatherType = type => {
    this.updateState({ type });
  };

  exportWeatherData = ({ station_name, start_date, end_date }) => {
    let { token } = this.state;

    return this.getAdapter()
      .exportWeatherData(token, station_name, start_date, end_date)
      .then(data => {
        return data;
      });
  };

  exportCompareData = ({
    station_names,
    weather_type,
    start_date,
    end_date,
  }) => {
    let { token } = this.state;

    return this.getAdapter()
      .exportCompareData(
        token,
        station_names,
        weather_type,
        start_date,
        end_date
      )
      .then(data => {
        return data;
      });
  };

  getWeatherStationCurrentData = station_name => {
    let { token } = this.state;

    return this.getAdapter().getWeatherStationCurrentData(token, station_name);
  };

  clearWeatherLogs = () => {
    this.updateState({ weatherStationLogs: [] });
  };

  setWindyMap = map => {
    this.updateState({ map });
  };

  clearComparelogs = () => {
    this.updateState({
      compareStationLogs: [],
      compareStationCsvData: [],
      compareType: "Temperature",
    });
  };

  getAssets = () => {
    let { token } = this.state;

    return this.getAdapter()
      .getAssets(token)
      .then(data => {
        return this.getWeatherStations(token).then(stations => {
          const { results } = data;
          const crops = results.filter(asset => asset.is_crop);
          const countries = results.filter(asset => asset.is_country);
          const formattedAssets = [
            { name: "Crop", data: crops },
            { name: "Country", data: countries },
            {
              name: "Weather Station",
              data: stations.map(station => ({
                id: station.id,
                name: station.station_name,
                device_token: station.device_token,
              })),
            },
          ];
          this.updateState({ assets: results, formattedAssets });
          return formattedAssets;
        });
      });
  };

  createAsset = payload => {
    let { token, assets, formattedAssets: allAssets } = this.state;

    return this.getAdapter()
      .createAsset(token, payload)
      .then(data => {
        let newAssets = [data, ...assets];
        const crops = newAssets.filter(asset => asset.is_crop);
        const countries = newAssets.filter(asset => asset.is_country);
        const formattedAssets = uniqBy([
          { name: "Crop", data: crops },
          { name: "Country", data: countries },
          ...allAssets
        ], "name");
        this.updateState({ assets: newAssets, formattedAssets });
        return data;
      });
  };

  updateAsset = payload => {
    let { token, assets, formattedAssets: allAssets } = this.state;

    return this.getAdapter()
      .updateAsset(token, payload)
      .then(data => {
        let newAssets = assets.map(asset => {
          if (asset.id === payload.id) {
            return data;
          }
          return asset;
        });
        const crops = newAssets.filter(asset => asset.is_crop);
        const countries = newAssets.filter(asset => asset.is_country);
        const formattedAssets = uniqBy([
          { name: "Crop", data: crops },
          { name: "Country", data: countries },
          ...allAssets
        ], "name");
        this.updateState({ assets: newAssets, formattedAssets });
        return data;
      });
  };

  deleteAsset = id => {
    let { token, assets, formattedAssets: allAssets } = this.state;

    return this.getAdapter()
      .deleteAsset(token, id)
      .then(data => {
        const newAssets = assets.filter(asset => asset.id !== id);
        const crops = newAssets.filter(asset => asset.is_crop);
        const countries = newAssets.filter(asset => asset.is_country);
        const formattedAssets = uniqBy([
          { name: "Crop", data: crops },
          { name: "Country", data: countries },
          ...allAssets
        ], "name");
        this.updateState({ assets: newAssets, formattedAssets });
        return data;
      });
  };

  searchAssets = search => {
    let { token, formattedAssets: allAssets } = this.state;

    return this.getAdapter()
      .searchAssets(token, search)
      .then(data => {
        const { results } = data;
        const crops = results.filter(asset => asset.is_crop);
        const countries = results.filter(asset => asset.is_country);
        const formattedAssets = uniqBy([
          { name: "Crop", data: crops },
          { name: "Country", data: countries },
          ...allAssets
        ], "name");
        this.updateState({
          assets: results,
          formattedAssets,
        });
        return formattedAssets;
      });
  };

  getWeatherStations = () => {
    let { token } = this.state;

    return this.getAdapter()
      .getWeatherStations(token)
      .then(data => {
        this.updateState({
          weatherStationsList: data,
        });
        return data;
      });
  };

  createWeatherStation = payload => {
    let { token, formattedAssets } = this.state;

    return this.getAdapter()
      .createWeatherStation(token, payload)
      .then(data => {
        // get all weather station assets from list of assets
        let weatherStaionAssets = formattedAssets.find(
          asset => asset.name.toLowerCase() === "weather station"
        );

        //update weather station assets with updated weather station
        let updatedWeatherStationAssets = [
          {
            id: data.id,
            name: data.station_name,
            device_token: data.device_token,
          },
          ...weatherStaionAssets.data,
        ];
        let newFormattedAssets = formattedAssets.map(item => {
          if (item.name.toLowerCase() === "weather station") {
            item.data = updatedWeatherStationAssets;
          }
          return item;
        });

        this.updateState({ formattedAssets: newFormattedAssets });
        return newFormattedAssets;
      });
  };

  updateWeatherStation = payload => {
    let { token, formattedAssets } = this.state;

    return this.getAdapter()
      .updateWeatherStation(token, payload)
      .then(data => {
        // get all weather station assets from list of assets
        let weatherStaionAssets = formattedAssets.find(
          asset => asset.name.toLowerCase() === "weather station"
        );

        //update weather station assets with updated weather station
        let updatedWeatherStationAssets = weatherStaionAssets.data.map(
          station => {
            if (station.id === data.id) {
              const { station_name, ...rest } = data;
              return {
                ...rest,
                id: data.id,
                name: station_name,
                device_token: data.device_token,
              };
            }
            return station;
          }
        );

        //update list of assets with new weather station assets
        let newFormattedAssets = formattedAssets.map(item => {
          if (item.name.toLowerCase() === "weather station") {
            item.data = updatedWeatherStationAssets;
          }
          return item;
        });

        this.updateState({ formattedAssets: newFormattedAssets });
        return newFormattedAssets;
      });
  };

  deleteWeatherStation = id => {
    let { token, formattedAssets } = this.state;

    return this.getAdapter()
      .deleteWeatherStation(token, id)
      .then(() => {
        // get all weather station assets from list of assets
        let weatherStaionAssets = formattedAssets.find(
          asset => asset.name.toLowerCase() === "weather station"
        );

        //remove deleted weather station from list of weather station assets
        let updatedWeatherStationAssets = weatherStaionAssets.data.filter(
          station => station.id !== id
        );

        //update list of assets with new weather station assets
        let newFormattedAssets = formattedAssets.map(item => {
          if (item.name.toLowerCase() === "weather station") {
            item.data = updatedWeatherStationAssets;
          }
          return item;
        });

        this.updateState({ formattedAssets: newFormattedAssets });
        return newFormattedAssets;
      });
  };

  render() {
    return (
      <DataContext.Provider value={this.state.context}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
