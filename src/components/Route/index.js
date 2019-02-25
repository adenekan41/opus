import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function NotLoggedInRoute({ isLoggedIn, redirect_url, ...rest }) {
  let url = redirect_url || '/';
  return !isLoggedIn() ? <Route {...rest} /> : <Redirect to={url} />;
}

export function ProtectedRoute({ isLoggedIn, ...rest }) {
  return isLoggedIn() ? <Route {...rest} /> : <Redirect to="/" />;
}
