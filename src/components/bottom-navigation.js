import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-material-ui';

import HomeLogo     from '../../assets/icons/home.png';
import SearchLogo   from '../../assets/icons/search.png';
import PlusLogo     from '../../assets/icons/plus.png';
import ChatLogo     from '../../assets/icons/chat.png';
import ShoppingLogo from '../../assets/icons/shopping-cart.png';

export default class BottomNav extends Component {
  constructor(props) {
    super(props);

    let currentRoute = this.props.navigation.state.routes[this.props.navigation.state.index].key;

    this.state = {
      active: currentRoute,
      shouldHideNav: (currentRoute === 'Login' || currentRoute === 'Register' || currentRoute === 'ForgotPassword' || currentRoute === 'Upload')
    };

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentRoute = nextProps.navigation.state.routes[nextProps.navigation.state.index].key;

    if (currentRoute !== this.state.active) {
      this.setState({
        active: currentRoute,
        shouldHideNav: (currentRoute === 'Login' || currentRoute === 'Register' || currentRoute === 'ForgotPassword' || currentRoute === 'Upload')
      });
      return true;
    } else {
      return false;
    }
  }

  handleNavigation(route) {
    this.setState({ active: route });
    this.props.navigation.navigate(route);

    if(route === 'Upload') {
      this.setState({ shouldHideNav: true });
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
            icon={ <Image source={HomeLogo} /> }
            onPress={ () => this.handleNavigation('Home') } />
          <BottomNavigation.Action
            key='Search'
            icon={ <Image source={SearchLogo} /> }
            onPress={ () => this.handleNavigation('Search') } />
          <BottomNavigation.Action
            key='Upload'
            icon={ <Image source={PlusLogo} /> }
            onPress={ () => this.handleNavigation('Upload') } />
          <BottomNavigation.Action
            key='Messages'
            icon={ <Image source={ChatLogo} /> }
            onPress={ () => this.handleNavigation('Messages') } />
          <BottomNavigation.Action
            key='Shopping'
            icon={ <Image source={ShoppingLogo} /> }
            onPress={ () => this.handleNavigation('Shopping') } />
        </BottomNavigation>
      );
    }
  }
}
