import React, { Component }    from 'react';
import { Provider }            from 'react-redux';
import { PersistGate }         from 'redux-persist/integration/react';
import { DotIndicator }        from 'react-native-indicators';
import { NativeRouter, Route } from 'react-router-native';
import styled                  from 'styled-components/native';

import CheckEmail       from './containers/auth/check-email.js';
import ForgotPassword   from './containers/auth/forgot-password.js';
import Hive             from './containers/hive.js';
import Home             from './containers/home.js';
import Login            from './containers/auth/login.js';
import Messages         from './containers/messages.js';
import NewPassword      from './containers/auth/new-password.js';
import Notifications    from './containers/notifications';
import PostRegistration from './containers/auth/post-registration.js';
import EditProfile      from './containers/edit-profile.js';
import Projects         from './containers/projects.js';
import Profile          from './containers/profile';
import Public           from './components/public-route.js';
import Private          from './components/private-route.js';
import Register         from './containers/auth/register.js';
import Shopping         from './containers/shopping.js';
import Search           from './containers/search.js';
import Settings         from './containers/settings.js';
import { blue }         from './theme.js';
import { store, persistor } from './redux/config';

export default class Router extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <PersistGate
          loading={
            <Centered>
              <DotIndicator color={blue} size={12} />
            </Centered>
          } persistor={persistor}>
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
              <Route path="/notifications" render={() => <Private component={Notifications} /> } />
              <Route path="/profile" render={() => <Private component={Profile} /> } />
              <Route path="/shopping" render={() => <Private component={Shopping} /> } />
              <Route path="/search" render={() => <Private component={Search} /> } />
              <Route path="/hive" render={() => <Private component={Hive} /> } />
              <Route path="/projects" render={() => <Private component={Projects} /> } />
              <Route path="/settings" render={() => <Private component={Settings} /> } />
            </StyledView>
          </NativeRouter>
        </PersistGate>
      </Provider>
    );
  }
}

const StyledView = styled.View`
  display: flex;
  flex: 1;
`

const Centered = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`
