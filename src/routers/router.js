import React, { Component }    from 'react';
import { NativeRouter, Route } from 'react-router-native';

import Login            from './login.js';
import Upload           from './upload.js';
import Home             from '../containers/home.js';
import Messages         from '../containers/messages.js';
import Shopping         from '../containers/shopping.js';
import Search           from '../containers/search.js';
import Notifications    from '../containers/notifications';
import Profile          from '../containers/profile';
import BottomNavigation from '../components/bottom-navigation.js';

export default class Router extends React.Component {
  render() {
    return(
      <NativeRouter>
        <BottomNavigation active={this.props}>
          <Route path="/" component={Login}/>
          <Route path="/upload" component={Upload}/>
          <Route path="/home" component={Home}/>
          <Route path="/messages" component={Messages}/>
          <Route path="/shopping" component={Shopping}/>
          <Route path="/search" component={Search}/>
          <Route path="/notifications" component={Notifications}/>
          <Route path="/profile" component={Profile}/>
        </BottomNavigation>
      </NativeRouter>
    );
  }
}
