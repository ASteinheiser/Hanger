import React, { Component } from 'react';
import styled               from 'styled-components/native';
import { Image, View, TouchableOpacity } from 'react-native';

import HomeLogo     from '../../assets/icons/home-white.png';
import SearchLogo   from '../../assets/icons/search-white.png';
import PlusLogo     from '../../assets/icons/plus-white.png';
import MessageLogo  from '../../assets/icons/messages-white.png';
import ShoppingLogo from '../../assets/icons/shopping-cart-white.png';

import theme from '../theme.js';

export default class BottomNav extends Component {
  constructor(props) {
    super(props);
    currentRoute = 'Home';

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
    this.props.history.push(route);

    if(route === 'Upload') {
      this.setState({ shouldHideNav: true });
    }
  }

  render() {
    if (this.state.shouldHideNav) {
      return null;
    } else {
      return (
        <FullScreen>

          { this.props.children }

          <BottomNavContainer color={theme.palette.primaryColor}>
            <Touchable onPress={ () => this.handleNavigation('Home') }>
              <StyledImage source={HomeLogo} wide={true} />
            </Touchable>
            <Touchable onPress={ () => this.handleNavigation('Search') }>
              <StyledImage source={SearchLogo} />
            </Touchable>
            <Touchable onPress={ () => this.handleNavigation('Upload') }>
              <StyledImage source={PlusLogo} />
            </Touchable>
            <Touchable onPress={ () => this.handleNavigation('Messages') }>
              <StyledImage source={MessageLogo} wide={true} />
            </Touchable>
            <Touchable onPress={ () => this.handleNavigation('Shopping') }>
              <StyledImage source={ShoppingLogo} />
            </Touchable>
          </BottomNavContainer>
        </FullScreen>
      );
    }
  }
}

const FullScreen = styled.View`
  display: flex;
  flex: 1;
`

const BottomNavContainer = styled.View`
  background: ${props => props.color};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledImage = styled.Image`
  width: ${props => props.wide ? '35px' : '30px'};
  height: 30px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
  padding: 15px 20px;
`
