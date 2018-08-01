import React, { Component } from 'react';
import { withRouter }       from 'react-router-native';
import { Auth }             from 'aws-amplify';

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
        });
    } else {
      this.setState({ authenticationComplete: true });
    }
  }

  render() {
    let Comp = this.props.component;

    return (
      <Comp {...this.props} />
    );
  }
}

export default withRouter(PublicRoute);
