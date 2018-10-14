import React, { Component }    from 'react';
import { API, Auth }           from 'aws-amplify';
import { NativeRouter, Route } from 'react-router-native';
import { DotIndicator }        from 'react-native-indicators';
import styled                  from 'styled-components/native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

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

import { blue }  from './theme.js';
import { store } from './redux/config';

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const { user } = store.getState();
    // if the user is a facebook user, as determined by the token
    // we need to use the stored fb token and re-authenticate
    if(user && user.keys) {
      this.setState({ loading: true }, () => {
        AccessToken.getCurrentAccessToken()
          .then(data => {
            let token = data.accessToken;
            let expires_at = data.expirationTime;
            let user = data;

            let graphParams = { parameters: {} };
            let infoRequest = new GraphRequest('/me', graphParams, (error, result) => {
                if (error) {
                  console.log('Error fetching data: ' + error.toString());
                  this.setState({ loading: false });
                } else {
                  let params = {
                    body: {
                      user: result
                    }
                  };
                  Auth.federatedSignIn('facebook', { token, expires_at }, user)
                    .then(result => {
                      API.post('HangerAPI', '/v1/auth/fb', params)
                        .then(response => {
                          console.log('re-authed fb tokens');
                          this.setState({ loading: false });
                        })
                        .catch(err => {
                          console.log(err);
                          this.setState({ loading: false });
                        });
                    })
                    .catch(err => {
                      console.log(err);
                      this.setState({ loading: false });
                    });
                }
              }
            );
            infoRequest.addStringParameter('id,name,email', 'fields');
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          })
          .catch(err => {
            console.log(err);
            this.setState({ loading: false });
          });
      });
    }
  }

  render() {
    const { loading } = this.state;

    if(loading) {
      return(
        <Centered>
          <DotIndicator color={blue} size={18} />
        </Centered>
      );
    }

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

const Centered = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`
