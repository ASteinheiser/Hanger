import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { DotIndicator }     from 'react-native-indicators';
import { withRouter }       from 'react-router-native';
import { Auth, API }        from 'aws-amplify';
import styled               from 'styled-components/native';

import theme       from '../theme.js'
import { setUser } from '../redux/actions/user';

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
    if(JSON.stringify(this.props.user) === JSON.stringify({})) {
      API.get('HangerAPI', '/v1/user')
        .then(response => {
          this.setState({ authenticationComplete: true });
          this.props.setUser(response);
          // take them to fill out info if they need to finish profile
          if(response.registration_step === 'additional_info'
              && this.props.location.pathname !== '/post-registration') {
            this.props.history.replace('/post-registration');
          }
        })
        .catch(err => {
          console.log(err);
          Auth.signOut();
          this.props.setUser();
          this.props.history.replace('/');
        });
    } else {
      let { user } = this.props;

      this.setState({ authenticationComplete: true });
      // take them to fill out info if they need to finish profile
      if(user.registration_step === 'additional_info'
          && this.props.location.pathname !== '/post-registration') {
        this.props.history.replace('/post-registration');
      }
    }
  }

  render() {
    const { authenticationComplete } = this.state;
    let Comp = this.props.component;

    if(!authenticationComplete) {
      return(
        <StyledView color={theme.palette.canvasColor}>
          <Container>
            <DotIndicator size={18} color={theme.palette.primaryColor}/>
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

const mapStateToProps = ({ user }) => {
  return { user };
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
