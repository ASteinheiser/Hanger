import React, { Component }       from 'react';
import { BottomNavigation, Icon } from 'react-native-material-ui';

export default class BottomNav extends Component {
  constructor(props) {
    super(props);

    let currentRoute = this.props.navigation.state.routes[this.props.navigation.state.index].key;

    this.state = {
      active: currentRoute,
      shouldHideNav: (currentRoute === 'Login' || currentRoute === 'Register' || currentRoute === 'ForgotPassword')
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentRoute = nextProps.navigation.state.routes[nextProps.navigation.state.index].key;

    if (currentRoute !== this.state.active) {
      this.setState({
        active: currentRoute,
        shouldHideNav: (currentRoute === 'Login' || currentRoute === 'Register' || currentRoute === 'ForgotPassword')
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.state.shouldHideNav) {
      return null;
    } else {
      return (
        <BottomNavigation active={this.state.active}>
          <BottomNavigation.Action
            key='Home'
            icon={ <Icon name='home' size={25} /> }
            onPress={() => {
              this.setState({ active: 'Home' })
              this.props.navigation.navigate('Home')
            } } />
          <BottomNavigation.Action
            key='Work'
            icon={ <Icon name='work' size={25} /> }
            onPress={() => {
              this.setState({ active: 'Work' })
              this.props.navigation.navigate('Work')
            } } />
          <BottomNavigation.Action
            key='Camera'
            icon={ <Icon name='add-a-photo' size={25} /> }
            onPress={() => {
              this.setState({ active: 'Camera' })
              this.props.navigation.navigate('Camera')
            } } />
          <BottomNavigation.Action
            key='Messages'
            icon={ <Icon name='message' size={25} /> }
            onPress={() => {
              this.setState({ active: 'Messages' })
              this.props.navigation.navigate('Messages')
            } } />
          <BottomNavigation.Action
            key='ShoppingCart'
            icon={ <Icon name='shopping-cart' size={25} /> }
            onPress={() => {
              this.setState({ active: 'ShoppingCart' })
              this.props.navigation.navigate('ShoppingCart')
            } } />
        </BottomNavigation>
      );
    }
  }
}
