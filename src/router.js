import React, { Component }    from 'react';
import { NativeRouter, Route } from 'react-router-native';
import styled                  from 'styled-components/native';

import CheckEmail       from './containers/auth/check-email';
import Event            from './containers/event';
import ForgotPassword   from './containers/auth/forgot-password';
import Hive             from './containers/hive';
import Home             from './containers/home';
import Login            from './containers/auth/login';
import Messages         from './containers/messages';
import MessageView      from './containers/message-view';
import NewPassword      from './containers/auth/new-password';
import Notifications    from './containers/notifications';
import PostRegistration from './containers/auth/post-registration';
import EditProfile      from './containers/edit-profile';
import PostImage        from './containers/post-image';
import Post             from './containers/post';
import Projects         from './containers/projects';
import Profile          from './containers/profile';
import Public           from './components/public-route';
import Private          from './components/private-route';
import Register         from './containers/auth/register';
import Shopping         from './containers/shopping';
import Search           from './containers/search';
import Settings         from './containers/settings';
import User             from './containers/user';

export default class Router extends Component {
  render() {
    return(
      <NativeRouter>
        <StyledView>
          <Route path="/" render={() => <Public component={Login} /> } />
          <Route path="/new-password" render={() => <Public component={NewPassword} /> } />
          <Route path="/forgot-password" render={() => <Public component={ForgotPassword} /> }  />
          <Route path="/check-email" render={() => <Public component={CheckEmail} /> }  />
          <Route path="/register" render={() => <Public component={Register} /> }  />
          <Route path="/home" render={() => <Private component={Home} /> } />
          <Route path="/post-registration" render={() => <Private component={PostRegistration} /> } />
          <Route path="/edit-profile" render={() => <Private component={EditProfile} /> } />
          <Route path="/messages" render={() => <Private component={Messages} /> } />
          <Route path="/message/:id" render={() => <Private component={MessageView} /> } />
          <Route path="/notifications" render={() => <Private component={Notifications} /> } />
          <Route path="/post-image" render={() => <Private component={PostImage} /> } />
          <Route path="/profile" render={() => <Private component={Profile} /> } />
          <Route path="/user/:id" render={() => <Private component={User} /> } />
          <Route path="/post/:id" render={() => <Private component={Post} /> } />
          <Route path="/event/:id" render={() => <Private component={Event} /> } />
          <Route path="/shopping" render={() => <Private component={Shopping} /> } />
          <Route path="/search" render={() => <Private component={Search} /> } />
          <Route path="/hive" render={() => <Private component={Hive} /> } />
          <Route path="/projects" render={() => <Private component={Projects} /> } />
          <Route path="/settings" render={() => <Private component={Settings} /> } />
        </StyledView>
      </NativeRouter>
    );
  }
}

const StyledView = styled.View`
  display: flex;
  flex: 1;
`
