import React, { Component } from 'react';
import { AsyncStorage }     from 'react-native';
import { Auth, API }        from 'aws-amplify';
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
          API.get('HangerAPI', '/v1/user')
            .then(response => {
              this.setState({ authenticationComplete: true });
              this.props.setuser(response);
              this.props.history.replace({
                pathname: '/home',
                state: { response }
              });
            })
            .catch(err => {
              console.log(err);
              Auth.signOut();
              this.props.setuser();
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
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default withRouter(PublicRoute);
