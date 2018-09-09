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
          if(typeof result === 'string' && result !== 'viewPublicFeed') {
            result = JSON.parse(result);
          }
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
              this.props.setuser();
              Auth.signOut();
              this.props.history.replace('/');
            });
        }
      });
    } else {
      let user = this.props.user;
      if(typeof user === 'string' && user !== 'viewPublicFeed') {
        user = JSON.parse(user);
      }
      this.setState({ authenticationComplete: true });
      // take them to fill out info if they need to finish profile
      if(user.registration_step === 'additional_info'
          && this.props.location.pathname !== '/post-registration') {
        this.props.history.replace('/post-registration');
      }
    }
  }

  render() {
    let Comp = this.props.component;
    let { user } = this.props;

    if(!this.state.authenticationComplete) {
      return(
        <StyledView color={theme.palette.canvasColor}>
          <Container>
            <DotIndicator size={18} color={theme.palette.primaryColor}/>
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
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default withRouter(PrivateRoute);
