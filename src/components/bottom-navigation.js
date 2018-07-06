import React, { Component }       from 'react';
import { BottomNavigation, Icon } from 'react-native-material-ui';

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
            icon={ <Icon name='home' size={25} /> }
            onPress={ () => this.handleNavigation('Home') } />
          <BottomNavigation.Action
            key='Search'
            icon={ <Icon name='search' size={25} /> }
            onPress={ () => this.handleNavigation('Search') } />
          <BottomNavigation.Action
            key='Upload'
            icon={ <Icon name='add-a-photo' size={25} /> }
            onPress={ () => this.handleNavigation('Upload') } />
          <BottomNavigation.Action
            key='Favorites'
            icon={ <Icon name='star' size={25} /> }
            onPress={ () => this.handleNavigation('Favorites') } />
          <BottomNavigation.Action
            key='Messages'
            icon={ <Icon name='message' size={25} /> }
            onPress={ () => this.handleNavigation('Messages') } />
        </BottomNavigation>
      );
    }
  }
}
