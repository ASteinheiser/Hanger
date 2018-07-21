import React, { Component } from 'react';
import { withRouter }       from 'react-router-native';
// import { Auth }             from 'aws-amplify';

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
    if (prevState.authenticationComplete === false) {
      this.authenticate();
    }
  }

  authenticate() {
    this.setState({ authenticationComplete: true });
    // Auth.currentUserInfo()
    //   .then(user => {
    //     if (user) {
    //       this.props.history.replace({
    //         pathname: '/auth-codes',
    //         search: '',
    //         state: { user }
    //       });
    //     }
    //     else {
    //       this.setState({ authenticationComplete: true });
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     Auth.signOut();
    //   });
  }

  render() {
    let Comp = this.props.component;

    return (
      <Comp {...this.props} />
    );
  }
}

export default withRouter(PublicRoute);
