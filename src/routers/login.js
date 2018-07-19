import React, { Component }            from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';

import Login          from '../containers/auth/login.js';
import Register       from '../containers/auth/register.js';
import ForgotPassword from '../containers/auth/forgot-password.js';

export default class LoginRouter extends React.Component {
  render() {
    return(
      <NativeRouter>
        <Switch>
          <Route path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </NativeRouter>
    );
  }
}
