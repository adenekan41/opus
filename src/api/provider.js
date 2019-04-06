import React from 'react';
import moment from 'moment';
import adapter from './adapter';
import { ACTIONS } from './actions';
import { DataContext } from './context';
import { clearState, saveState, loadState } from '../localStorage';
import { convertStringToNumber, weatherTypeData } from '../helpers/functions';

export class DataProvider extends React.Component {
  static defaultProps = {
    adapter,
  };

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      users: [],
      contacts: [],
      alerts: [],
      crops: [],
      weatherStations: [],
      weatherStation: {},
      weatherStationLogs: [],
      user: {},
      profile: {
        username: 'admin',
        first_name: 'Micha',
        last_name: 'Van Winkelhof',
      },
      type: 'Temperature',
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
      (loadState() || { auth: { token: '' } } || { auth: { token: '' } })
        .auth || '';
    if (!this.props.token) {
      return { token: auth.token, opus1_token: auth.opus1_token };
    } else {
      return { token: this.props.token, opus1_token: this.props.opus1_token };
    }
  };

  initialize = tokens => {
    let { token } = tokens;
    return Promise.all([
      // this.getProfile(opus1_token),
      // this.getWhatsappAlerts(token),
      // this.getCrops(opus1_token),
      // this.getContacts(token),
      // this.getUsers(opus1_token),
      this.getWeatherData(token),
      // this.getWeatherStationCurrentData('sefwi01'),
      // this.getWeatherStationCurrentData('sefwi02'),
      // this.getWeatherStationCurrentData('sefwi03'),
    ]).then(data => {
      return {
        // profile: data[0],
        // alerts: data[1],
        // crops: data[2],
        // contacts: data[3],
        // users: data[4],
        weatherStations: data[0],
      };
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
      [ACTIONS.GET_WHATSAPP_ALERTS]: this.getWhatsappAlerts,
      [ACTIONS.SEND_WHATSAPP_ALERT]: this.sendWhatsappAlert,
      [ACTIONS.GET_CONTACTS]: this.getContacts,
      [ACTIONS.GET_CONTACT]: this.getContact,
      [ACTIONS.CREATE_CONTACT]: this.createContact,
      [ACTIONS.UPDATE_CONTACT]: this.updateContact,
      [ACTIONS.DELETE_CONTACT]: this.deleteContact,
      [ACTIONS.GET_WEATHER_FORECAST_LOGS]: this.getWeatherForecastLogs,
      [ACTIONS.GET_WEATHER_DATA]: this.getWeatherData,
      [ACTIONS.UPDATE_WEATHER_STATION_DATA]: this.updateWeatherStationData,
      [ACTIONS.EXPORT_WEATHER_DATA]: this.exportWeatherData,
      [ACTIONS.GET_WEATHER_STATION_DATA]: this.getWeatherStationData,
      [ACTIONS.FILTER_WEATHER_DATA_BY_DATE]: this.filterWeatherLogByDate,
      [ACTIONS.FILTER_WEATHER_DATA_BY_TYPE]: this.filterWeatherLogByType,
      [ACTIONS.UPDATE_WEATHER_TYPE]: this.updateWeatherType,
      [ACTIONS.CLEAR_WEATHER_LOGS]: this.clearWeatherLogs,
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
      users: [],
      fetching: false,
      profile: this.props.profile || {},
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

  getUsers = token => {
    let { users = [] } = this.state;
    if (users.length > 0) {
      return new Promise(resolve => resolve(users));
    }
    return this.getAdapter()
      .getUsers(token)
      .then(data => {
        this.updateState({
          users: data,
        });
        return data;
      });
  };

  getUser = id => {
    let { opus1_token } = this.state;
    return this.getAdapter()
      .getUser(opus1_token, id)
      .then(data => {
        this.updateState({
          user: data,
        });
        return data;
      });
  };

  createUser = payload => {
    let { opus1_token, users } = this.state;
    return this.getAdapter()
      .createUser(opus1_token, payload)
      .then(data => {
        this.updateState({ users: [data, ...users] });
        return data;
      });
  };

  adminCreateUser = payload => {
    let { opus1_token, users } = this.state;
    return this.getAdapter()
      .adminCreateUser(opus1_token, payload)
      .then(data => {
        this.updateState({ users: [data, ...users] });
        return data;
      });
  };

  updateUser = payload => {
    let { opus1_token, users } = this.state;
    return this.getAdapter()
      .updateUser(opus1_token, payload)
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
    let { opus1_token, users } = this.state;
    return this.getAdapter()
      .patchUser(opus1_token, payload)
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
    let { opus1_token, users } = this.state;
    return this.getAdapter()
      .deleteUser(opus1_token, id)
      .then(data => {
        let result = users.filter(user => user.id !== id);
        this.updateState({ users: result });
        return data;
      });
  };

  getWhatsappAlerts = () => {
    let { token, alerts } = this.state;
    if (alerts.length > 0) {
      return Promise(resolve => resolve({ alerts }));
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

  getContacts = token => {
    let { contacts = [] } = this.state;
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

  getWeatherForecastLogs = () => {
    let { token } = this.state;
    return this.getAdapter()
      .getWeatherForecastLogs(token)
      .then(data => data);
  };

  getCrops = token => {
    let { crops } = this.state;
    if (crops.length > 0) {
      return Promise(resolve => resolve({ crops }));
    }
    return this.getAdapter()
      .getCrops(token)
      .then(data => {
        this.updateState({ crops: data });
        return data;
      });
  };

  getWeatherData = token => {
    let { weatherStations } = this.state;
    if (weatherStations.length > 0) {
      return Promise(resolve => resolve({ weatherStations }));
    }
    return this.getAdapter()
      .getWeatherData(token)
      .then(data => {
        let formatData = data.map(value => value.response_data);
        this.updateState({ weatherStations: formatData });
        return formatData;
      });
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

  getWeatherStationData = station_name => {
    let { token } = this.state;
    return this.getAdapter()
      .getWeatherStationData(token, station_name)
      .then(data => {
        let formatData = data.map(value => value.response_data);
        this.updateState({ weatherStationLogs: formatData });
        return formatData;
      });
  };

  filterWeatherLogByDate = dates => {
    let { weatherStationLogs } = this.state;
    let { startDate, endDate } = dates;
    let data = weatherStationLogs;
    let today = new Date();
    let todayInSeconds = convertStringToNumber(moment(today).format('X'));
    let startDateInSeconds = convertStringToNumber(
      moment(startDate).format('X')
    );
    let endDateInSeconds = convertStringToNumber(moment(endDate).format('X'));
    if (
      todayInSeconds === startDateInSeconds &&
      todayInSeconds === endDateInSeconds
    ) {
      data = weatherStationLogs;
    } else {
      data = weatherStationLogs.filter(station => {
        let { observation_time } = station;
        let time = convertStringToNumber(moment(observation_time).format('X'));
        if (time >= startDateInSeconds && time <= endDateInSeconds) {
          return station;
        }
      });
    }
    return data;
  };

  filterWeatherLogByType = value => {
    let { type, dates } = value;
    if (type) {
      this.updateWeatherType(type);
      let result = [];
      let weatherStationLogs = this.filterWeatherLogByDate(dates);
      let observationTimes = weatherStationLogs.map(value =>
        moment(value.observation_time).format('DD/MM/YYYY hh:mm')
      );
      weatherTypeData[type].forEach(item => {
        result.push(weatherStationLogs.map(value => value[item]));
      });
      return { result, observationTimes };
    }
  };

  updateWeatherType = type => {
    this.updateState({ type });
  };

  exportWeatherData = () => {
    return this.getAdapter()
      .exportWeatherData()
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

  render() {
    return (
      <DataContext.Provider value={this.state.context}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
