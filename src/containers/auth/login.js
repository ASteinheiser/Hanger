import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { AsyncStorage }     from 'react-native';
import { API, Auth }        from 'aws-amplify';
import styled               from 'styled-components/native';
import { DotIndicator }     from 'react-native-indicators';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import Divider           from '../../components/divider.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

import HangerTextLogo from '../../../assets/logos/hanger-text-only-white.png';
import HangerLogo     from '../../../assets/icons/hanger-white.png';
import Runway         from '../../../assets/images/runway.jpeg';
import Photographer   from '../../../assets/images/photographer.jpeg';

import { setUser } from '../../redux/actions/user';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:    { value: '', valid: true },
      password: { value: '', valid: true },
      alertMessage: '',
      loading: false,
      firstLaunch: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('alreadyLaunched')
      .then(value => {
        if(value === null) {
          AsyncStorage.setItem('alreadyLaunched', 'true')
            .then(res => {
              this.setState({ firstLaunch: true });
            })
            .catch(err => {
              console.log(err);
              this.setState({ firstLaunch: true });
            });
        }
        else {
          this.setState({ firstLaunch: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ firstLaunch: true });
      });
    }

  onChange(field, e) {
    if(e.nativeEvent) {
      let { value, valid } = validateField(field, e.nativeEvent.text, this.state);

      this.setState({
        [field]: { value, valid }
      });
    }
  }

  handleLogin() {
    const formObject = { email: this.state.email, password: this.state.password };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true}, () => {
        this.closeAlert();

        Auth.signIn(this.state.email.value.toLowerCase(), this.state.password.value)
          .then(response => {
            let params = {
              body: {
                email: this.state.email.value.toLowerCase()
              }
            };
            API.post('HangerAPI', '/v1/user/confirm', params)
              .then(response => {
                this.setState({ loading: false });
                this.handleNavigation('/home');
              })
              .catch(err => {
                console.log(err);
                this.setState({ alertMessage: err.message, loading: false });
              });
          })
          .catch(err => {
            this.setState({ alertMessage: err.message, loading: false });
          });
      });
    } else {
      emptyFields.forEach(fieldName => {
        this.setState({[fieldName]: {value: '', valid: false}});
      });
    }
  }

  closeAlert() {
    this.setState({ alertMessage: '' });
  }

  handleNavigation(route) {
    this.setState({
      email:    { value: '', valid: true },
      password: { value: '', valid: true },
      alertMessage: '',
      loading: false
    });
    this.props.history.push(route);
  }

  handleViewPublicFeed() {
    this.props.setUser({ id: 'viewPublicFeed' });
    this.props.history.push('/home');
  }

  handleGetStarted() {
    this.setState({ firstLaunch: false });
  }

  handleFacebookLogin() {
    let self = this;
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(
      function(result) {
        if (result.isCancelled) {
          // do nothing
        } else {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              let token = data.accessToken;
              let expires_at = data.expirationTime;
              let user = data;

              let graphParams = { parameters: {} };
              let infoRequest = new GraphRequest('/me', graphParams, (error, result) => {
                  if (error) {
                    console.log('Error fetching data: ' + error.toString());
                    this.setState({ alertMessage: 'Error authenticating with Facebook. Please try again.' });
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
                            // set the token and expires at in the redux state for refresh token func
                            self.props.setUser({
                              keys: {
                                facebookToken: token,
                                facebookExpires: expires_at
                              }
                            });
                            self.handleNavigation('/home');
                          })
                          .catch(err => {
                            console.log(err);
                            self.setState({ alertMessage: 'Error authenticating with Facebook. Please try again.' });
                          });
                      })
                      .catch(err => {
                        console.log(err);
                        self.setState({ alertMessage: 'Error authenticating with Facebook. Please try again.' });
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
              this.setState({ alertMessage: 'Error authenticating with Facebook. Please try again.' });
            });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
        this.setState({ alertMessage: 'Error authenticating with Facebook. Please try again.' });
      }
    )
    .catch(err => {
      console.log(err);
      this.setState({ alertMessage: 'Error authenticating with Facebook. Please try again.' });
    });
  }

  render() {
    if(this.state.firstLaunch === null) {
      return null; // wait for asyncStorage call to finish
    } else if (this.state.firstLaunch === true) {
      return (
        <Flex>
          <BackgroundImage source={Runway} />
          <BackgroundFilter />

          <WelcomeContainer>
            <FullWidth>
              <HangerImage source={HangerLogo} />
            </FullWidth>
            <FullWidth>
              <HangerImageText source={HangerTextLogo} />
            </FullWidth>
            <MarginAuto>
              <Button
                primary
                large
                text="Get Started"
                onPress={this.handleGetStarted.bind(this)} />
            </MarginAuto>
          </WelcomeContainer>
        </Flex>
      );
    } else {
      return (
        <Flex>
          <BackgroundImage source={Photographer} />
          <BackgroundFilter />

          <Container>
            <TopPadding>
              <FullWidth>
                <HangerImage small source={HangerLogo} />
              </FullWidth>
            </TopPadding>

            <HeaderText small
              text='Welcome to Hanger'
              body='Manage your social media to share your style and connect with other fashion lovers!' />

            <Alert message={this.state.alertMessage} />

            <InputMargin>
              <Input
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                keyboardType={'email-address'}
                onChange={this.onChange.bind(this, 'email')}
                label={'Email Address'}
                value={this.state.email.value}
                error={!this.state.email.valid ? 'Enter a valid email.' : ''}
                />
            </InputMargin>

            <InputMargin>
              <Input
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                secureTextEntry={true}
                onChange={this.onChange.bind(this, 'password')}
                label={'Password'}
                value={this.state.password.value}
                error={!this.state.password.valid ? 'Enter a valid password.' : ''}
                />
            </InputMargin>

            <TopMargin>
              {
                this.state.loading ?
                  <DotIndicator size={18} count={3} color={'#ffffff'}/>
                  :
                  <Button
                    primary
                    disabled={this.state.loading}
                    icon="subdirectory-arrow-right"
                    text="Login"
                    onPress={this.handleLogin.bind(this)} />
              }
            </TopMargin>

            <Margin>
              <Button
                primary
                icon="face"
                text="Facebook Login"
                onPress={this.handleFacebookLogin.bind(this)} />
              </Margin>

            <Divider />

            <Margin>
              <Button
                primary
                icon="supervisor-account"
                text="Skip Login"
                onPress={this.handleViewPublicFeed.bind(this)} />
            </Margin>

            <Margin>
              <Button
                primary
                icon="email"
                text="Register"
                onPress={this.handleNavigation.bind(this, '/register')} />
            </Margin>
            <Margin>
              <Button
                primary
                icon="help-outline"
                text="Forgot Password"
                onPress={this.handleNavigation.bind(this, '/forgot-password')} />
            </Margin>
          </Container>
        </Flex>
      );
    }
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  flex: 1;

  z-index: 3;
`

const Margin = styled.View`
  margin: 20px 20% 20px 20%;
`

const TopMargin = styled.View`
  margin: 30px 20% 20px 20%;
`

const HangerImage = styled.Image`
  width: ${props => props.small ? '100px' : '150px'};
  height: ${props => props.small ? '100px' : '150px'};

  margin: 0 auto;
`

const HangerImageText = styled.Image`
  width: 250px;
  height: 75px;

  margin: 0 auto 50px auto;
`

const BackgroundImage = styled.Image`
  position: absolute;

  height: 100%;
  width: 100%;

  z-index: 1;
`

const BackgroundFilter = styled.View`
  position: absolute;

  height: 100%;
  width: 100%;

  background: rgba(0, 0, 0, 0.5);

  z-index: 2;
`

const WelcomeContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;

  justify-content: center;
  z-index: 3;
`

const FullWidth = styled.View`
  width: 100%;
`

const MarginAuto = styled.View`
  margin: 0 auto;
`

const InputMargin = styled.View`
  margin: 0 5%;
`

const TopPadding = styled.View`
  padding-top: 25px;
`

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);
