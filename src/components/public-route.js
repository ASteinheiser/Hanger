import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Auth, API }        from 'aws-amplify';
import { withRouter }       from 'react-router-native';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';

import theme       from '../theme.js';
import { setUser } from '../redux/actions/user';

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
    if(JSON.stringify(this.props.user) === JSON.stringify({}) ||
      JSON.stringify(Object.keys(this.props.user)) === JSON.stringify(["keys"])) {
      API.get('HangerAPI', '/v1/user')
        .then(response => {
          this.setState({ authenticationComplete: true });
          this.props.setUser(response);
          this.props.history.replace('/home');
        })
        .catch(err => {
          console.log(err);
          Auth.signOut();
          this.props.setUser();
          this.setState({ authenticationComplete: true });
        });
    } else {
      this.setState({ authenticationComplete: true });
      this.props.history.replace('/home');
    }
  }

  render() {
    let Comp = this.props.component;
    const { authenticationComplete } = this.state;

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicRoute));
