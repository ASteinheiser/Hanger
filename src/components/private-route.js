import React, { Component } from 'react';
import { AsyncStorage }     from 'react-native';
import { withRouter }       from 'react-router-native';
import { Auth }             from 'aws-amplify';

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
          this.setState({ authenticationComplete: true });
          this.props.setuser(result);
        }
        else {
          Auth.currentUserInfo()
            .then(user => {
              if (!user) {
                this.setState({ authenticationComplete: true });
                this.props.history.replace('/');
              }
              else {
                this.setState({ authenticationComplete: true });
                this.props.setuser(user);
              }
            })
            .catch(err => {
              Auth.signOut();
              this.props.setuser(null);
              this.props.history.replace('/');
            });
        }
      });
    } else {
      this.setState({ authenticationComplete: true });
    }
  }

  render() {
    let Comp = this.props.component;
    let { user } = this.state;

    if(!user && this.props.user) {
      user = this.props.user;
    }

    return (
      <Comp {...this.props} user={user} />
    );
  }
}

export default withRouter(PrivateRoute);
