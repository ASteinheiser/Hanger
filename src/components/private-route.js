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
          let user = result;
          this.setState({ authenticationComplete: true });
          this.props.setuser(user);
          // take them to fill out info if they need to finish profile
          if(user && user.attributes
            && user.attributes['custom:registration_step'] === 'additional_info'
            && this.props.location.pathname !== '/post-registration') {
            this.props.history.replace('/post-registration');
          }
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
                // take them to fill out info if they need to finish profile
                if(user.attributes
                  && user.attributes['custom:registration_step'] === 'additional_info'
                  && this.props.location.pathname !== '/post-registration') {
                  this.props.history.replace('/post-registration');
                }
              }
            })
            .catch(err => {
              Auth.signOut();
              this.props.setuser();
              this.props.history.replace('/');
            });
        }
      });
    } else {
      this.setState({ authenticationComplete: true });
      // take them to fill out info if they need to finish profile
      if(this.props.user && this.props.user.attributes
        && this.props.user.attributes['custom:registration_step'] === 'additional_info'
        && this.props.location.pathname !== '/post-registration') {
        this.props.history.replace('/post-registration');
      }
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
