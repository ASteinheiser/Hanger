import React, { Component } from 'react';
import { withRouter }       from 'react-router-native';
// import { Auth }             from 'aws-amplify';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    let user = null;
    if(props.history.location.state && props.history.location.state.user) {
      user = props.history.location.state.user;
    }

    this.state = {
      authenticationComplete: false,
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
    // if(!this.state.user) {
    //   Auth.currentUserInfo()
    //     .then(user => {
    //       if (!user) {
    //         this.props.history.replace('/');
    //         this.setState({ user: null });
    //       }
    //       else {
    //         this.setState({ authenticationComplete: true, user: user });
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err);
    //       Auth.signOut();
    //       this.props.history.replace('/');
    //     });
    // } else {
    this.setState({ authenticationComplete: true });
    // }
  }

  render() {
    let Comp = this.props.component;

    return (
      <Comp {...this.props} user={this.state.user} />
    );
  }
}

export default withRouter(PrivateRoute);
