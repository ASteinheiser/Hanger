import React, { Component }    from 'react';
import { AsyncStorage, View }  from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import styled                  from 'styled-components/native';

import Camera           from './containers/upload/camera.js';
import CheckEmail       from './containers/auth/check-email.js';
import ForgotPassword   from './containers/auth/forgot-password.js';
import Hive             from './containers/hive.js';
import Home             from './containers/home.js';
import Login            from './containers/auth/login.js';
import Messages         from './containers/messages.js';
import NewPassword      from './containers/auth/new-password.js';
import Notifications    from './containers/notifications';
import PostRegistration from './containers/auth/post-registration.js';
import ProfileUpload    from './containers/upload/profile-upload.js';
import EditProfile      from './containers/upload/edit-profile.js';
import Projects         from './containers/projects.js';
import Profile          from './containers/profile';
import Public           from './components/public-route.js';
import Private          from './components/private-route.js';
import Register         from './containers/auth/register.js';
import Shopping         from './containers/shopping.js';
import Search           from './containers/search.js';
import Settings         from './containers/settings.js';

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  updateUser(user) {
    if(!user) {
      AsyncStorage.removeItem('@user')
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if(typeof user !== 'string') user = JSON.stringify(user);
      AsyncStorage.setItem('@user', user)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.setState({ user: user });
  }

  render() {
    return(
      <NativeRouter>
        <StyledView>
          <Route path="/" render={() => <Public user={this.state.user} setuser={this.updateUser.bind(this)} component={Login} /> } />
          <Route path="/new-password" render={() => <Public user={this.state.user} setuser={this.updateUser.bind(this)} component={NewPassword} /> } />
          <Route path="/forgot-password" render={() => <Public user={this.state.user} setuser={this.updateUser.bind(this)} component={ForgotPassword} /> }  />
          <Route path="/check-email" render={() => <Public user={this.state.user} setuser={this.updateUser.bind(this)} component={CheckEmail} /> }  />
          <Route path="/register" render={() => <Public user={this.state.user} setuser={this.updateUser.bind(this)} component={Register} /> }  />
          <Route path="/camera" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Camera} /> } />
          <Route path="/home" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Home} /> } />
          <Route path="/post-registration" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={PostRegistration} /> } />
          <Route path="/profile-upload" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={ProfileUpload} /> } />
          <Route path="/edit-profile" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={EditProfile} /> } />
          <Route path="/messages" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Messages} /> } />
          <Route path="/notifications" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Notifications} /> } />
          <Route path="/profile" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Profile} /> } />
          <Route path="/shopping" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Shopping} /> } />
          <Route path="/search" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Search} /> } />
          <Route path="/hive" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Hive} /> } />
          <Route path="/projects" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Projects} /> } />
          <Route path="/settings" render={() => <Private user={this.state.user} setuser={this.updateUser.bind(this)} component={Settings} /> } />
        </StyledView>
      </NativeRouter>
    );
  }
}

const StyledView = styled.View`
  display: flex;
  flex: 1;
`
