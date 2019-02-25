import React from 'react';
import adapter from './adapter';
import { ACTIONS } from './actions';
import { DataContext } from './context';
import { clearState, saveState, loadState } from '../localStorage';

export class DataProvider extends React.Component {
  static defaultProps = {
    adapter,
  };
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      users: [],
      user: {},
      profile: {},
      token: this.loadTokenFromStorage(),
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
    this.initialize(token).then(data => {
      saveState({
        ...loadState(),
        auth: { ...loadState().auth, user: data.profile },
      });
      this.updateState({ fetching: false });
    });
  }
  loadTokenFromStorage = () => {
    let auth =
      (loadState() || { auth: { token: '' } } || { auth: { token: '' } })
        .auth || '';
    if (!this.props.token) {
      return auth.token;
    } else {
      return this.props.token;
    }
  };
  initialize = token => {
    let { profile } = this.state;
    if (Object.values(profile).length > 0) {
      return Promise(resolve => resolve({ profile }));
    }
    return Promise.all([this.getProfile(token)]).then(data => {
      return {
        profile: data[0],
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
        console.log(data);
        this.updateState({ users: [data, ...users] });
        return data;
      });
  };
  adminCreateUser = payload => {
    let { token, users } = this.state;
    return this.getAdapter()
      .adminCreateUser(token, payload)
      .then(data => {
        console.log(data);
        this.updateState({ users: [data, ...users] });
        return data;
      });
  };
  updateUser = (id, payload) => {
    let { token, users } = this.state;
    return this.getAdapter()
      .updateUser(token, id, payload)
      .then(data => {
        console.log(data);
        let result = users.map(user => {
          if (user.id === id) {
            return data;
          }
          return user;
        });
        this.updateState({ users: result });
        return data;
      });
  };
  patchUser = (id, payload) => {
    let { token, users } = this.state;
    return this.getAdapter()
      .patchUser(token, id, payload)
      .then(data => {
        console.log(data);
        let result = users.map(user => {
          if (user.id === id) {
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

  render() {
    return (
      <DataContext.Provider value={this.state.context}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
