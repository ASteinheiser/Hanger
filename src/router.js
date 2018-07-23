import React, { Component }    from 'react';
import { NativeRouter, Route } from 'react-router-native';

import BottomNavigation from './components/bottom-navigation.js';
import Camera           from './containers/upload/camera.js';
import ForgotPassword   from './containers/auth/forgot-password.js';
import Home             from './containers/home.js';
import Login            from './containers/auth/login.js';
import Messages         from './containers/messages.js';
import NewPassword      from './containers/auth/new-password.js';
import Notifications    from './containers/notifications';
import Profile          from './containers/profile';
import Register         from './containers/auth/register.js';
import Shopping         from './containers/shopping.js';
import Search           from './containers/search.js';

export default class Router extends React.Component {
  render() {
    return(
      <NativeRouter>
        <BottomNavigation>
          <Route path="/" component={Login}/>
          <Route path="/camera" component={Camera}/>
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/home" component={Home}/>
          <Route path="/messages" component={Messages}/>
          <Route path="/new-password" component={NewPassword}/>
          <Route path="/notifications" component={Notifications}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/register" component={Register} />
          <Route path="/shopping" component={Shopping}/>
          <Route path="/search" component={Search}/>
        </BottomNavigation>
      </NativeRouter>
    );
  }
}
