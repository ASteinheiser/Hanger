import React, { Component } from 'react';
import { AsyncStorage }     from 'react-native';
import { DotIndicator }     from 'react-native-indicators';
import { withRouter }       from 'react-router-native';
import { Auth, API }        from 'aws-amplify';
import styled               from 'styled-components/native';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticationComplete: false
    };
  }

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.authenticationComplete === false) {
      this.authenticate();
    }
  }

  authenticate() {
    if(!this.props.user) {
      AsyncStorage.getItem('@user', (error, result) => {

        if(result) {
          let user = result;
          this.setState({ authenticationComplete: true });
          this.props.setuser(user);
          // take them to fill out info if they need to finish profile
          if(user.registration_step === 'additional_info'
              && this.props.location.pathname !== '/post-registration') {
            this.props.history.replace('/post-registration');
          }
        }
        else {
          API.get('HangerAPI', '/v1/user')
            .then(response => {
              this.setState({ authenticationComplete: true });
              this.props.setuser(response);
              // take them to fill out info if they need to finish profile
              if(response.registration_step === 'additional_info'
                  && this.props.location.pathname !== '/post-registration') {
                this.props.history.replace('/post-registration');
              }
            })
            .catch(err => {
              console.log(err);
              Auth.signOut();
              this.props.setuser();
              this.props.history.replace('/');
            });
        }
      });
    } else {
      this.setState({ authenticationComplete: true });
      // take them to fill out info if they need to finish profile
      if(this.props.user.registration_step === 'additional_info'
          && this.props.location.pathname !== '/post-registration') {
        this.props.history.replace('/post-registration');
      }
    }
  }

  render() {
    let Comp = this.props.component;
    let { user } = this.state;

    if(!user && this.props.user) {
      user = this.props.user;
    }

    if(!this.state.authenticationComplete) {
      return(
        <StyledView color={theme.palette.canvasColor}>
          <Container>

            <StyledText color={theme.palette.primaryColor}>
              {'Checking Credentials...'}
            </StyledText>

            <DotIndicator color={theme.palette.primaryColor}/>

          </Container>
        </StyledView>
      )
    }

    return (
      <Comp {...this.props} user={user} />
    );
  }
}

const StyledView = styled.View`
  background: ${props => props.color};

  height: 100%;
`

const Container = styled.View`
  margin: 50px auto;
`

const StyledText = styled.Text`
  font-size: 28px;

  color: ${props => props.color};

  margin-bottom: 50px;
  margin-top: 50px;
`

export default withRouter(PrivateRoute);
