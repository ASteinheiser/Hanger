import React, { Component } from 'react';
import { withRouter }       from 'react-router-native';
import { Auth }             from 'aws-amplify';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    let user = null;
    if(props.history.location.state && props.history.location.state.user) {
      user = props.history.location.state.user;
    }

    this.state = {
      authenticationComplete: user ? true : false,
      user: user
    };
  }

  componentDidMount() {
    this.authenticate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.authenticationComplete === false) {
      this.authenticate();
    }
  }

  authenticate() {
    console.log('private route auth');
    console.log(this.state.user)
    if(!this.state.user) {
      Auth.currentUserInfo()
        .then(user => {
          console.log('got user:')
          console.log(user)
          if (!user) {
            this.props.history.replace('/');
          }
          else {
            this.setState({ authenticationComplete: true, user: user });
          }
        })
        .catch(err => {
          console.log('got an err: ', err);
          console.error(err);
          Auth.signOut();
          this.props.history.replace('/');
        });
    } else {
      this.setState({ authenticationComplete: true });
    }
  }

  render() {
    let Comp = this.props.component;

    return (
      <Comp {...this.props} user={this.state.user} />
    );
  }
}

export default withRouter(PrivateRoute);
