import React, { Component } from 'react';
import { AsyncStorage }     from 'react-native';
import { Auth }             from 'aws-amplify';
import { withRouter }       from 'react-router-native';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';

import theme from '../theme.js';

class PublicRoute extends Component {
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
          this.setState({ authenticationComplete: true });
          this.props.setuser(result);
          this.props.history.replace('/home');
        }
        else {
          Auth.currentUserInfo()
            .then(user => {
              if (user) {
                this.setState({ authenticationComplete: true });
                this.props.setuser(user);
                this.props.history.replace({
                  pathname: '/home',
                  state: { user }
                });
              }
              else {
                this.setState({ authenticationComplete: true });
              }
            })
            .catch(err => {
              Auth.signOut();
              this.props.setuser(null);
              this.setState({ authenticationComplete: true });
            });
        }
      });
    } else {
      this.setState({ authenticationComplete: true });
    }
  }

  render() {
    let Comp = this.props.component;

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
      <Comp {...this.props} />
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

export default withRouter(PublicRoute);
