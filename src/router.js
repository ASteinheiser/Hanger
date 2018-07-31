import React, { Component }    from 'react';
import { NativeRouter, Route } from 'react-router-native';

import BottomNavigation from './components/bottom-navigation.js';
import Camera           from './containers/upload/camera.js';
import ForgotPassword   from './containers/auth/forgot-password.js';
import Hive             from './containers/hive.js';
import Home             from './containers/home.js';
import Login            from './containers/auth/login.js';
import Messages         from './containers/messages.js';
import NewPassword      from './containers/auth/new-password.js';
import Notifications    from './containers/notifications';
import Projects         from './containers/projects.js';
import Profile          from './containers/profile';
import Public           from './components/public-route.js';
import Private          from './components/private-route.js';
import Register         from './containers/auth/register.js';
import Shopping         from './containers/shopping.js';
import Search           from './containers/search.js';
import Settings         from './containers/settings.js';

export default class Router extends React.Component {
  render() {
    return(
      <NativeRouter>
        <BottomNavigation>
          <Route path="/" render={() => <Public component={Login} /> } />
          <Route path="/new-password" render={() => <Public component={NewPassword} /> } />
          <Route path="/forgot-password" render={() => <Public component={ForgotPassword} /> }  />
          <Route path="/register" render={() => <Public component={Register} /> }  />
          <Route path="/camera" render={() => <Private component={Camera} /> } />
          <Route path="/home" render={() => <Private component={Home} /> } />
          <Route path="/messages" render={() => <Private component={Messages} /> } />
          <Route path="/notifications" render={() => <Private component={Notifications} /> } />
          <Route path="/profile" render={() => <Private component={Profile} /> } />
          <Route path="/shopping" render={() => <Private component={Shopping} /> } />
          <Route path="/search" render={() => <Private component={Search} /> } />
          <Route path="/hive" render={() => <Private component={Hive} /> } />
          <Route path="/projects" render={() => <Private component={Projects} /> } />
          <Route path="/settings" render={() => <Private component={Settings} /> } />
        </BottomNavigation>
      </NativeRouter>
    );
  }
}
