import React, { Component } from 'react';
import { Image, View }      from 'react-native';
import styled               from 'styled-components/native';

import HomeLogo     from '../../assets/icons/home.png';
import SearchLogo   from '../../assets/icons/search.png';
import PlusLogo     from '../../assets/icons/plus.png';
import MessageLogo  from '../../assets/icons/messages.png';
import ShoppingLogo from '../../assets/icons/shopping-cart.png';

import theme from '../theme.js';

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
        <BottomNavContainer color={theme.palette.primaryColor}>
          <ImageContainer onPress={ () => this.handleNavigation('Home') }>
            <StyledImage source={HomeLogo} wide={true} />
          </ImageContainer>
          <ImageContainer onPress={ () => this.handleNavigation('Search') }>
            <StyledImage source={SearchLogo} />
          </ImageContainer>
          <ImageContainer onPress={ () => this.handleNavigation('Upload') }>
            <StyledImage source={PlusLogo} />
          </ImageContainer>
          <ImageContainer onPress={ () => this.handleNavigation('Messages') }>
            <StyledImage source={MessageLogo} wide={true} />
          </ImageContainer>
          <ImageContainer onPress={ () => this.handleNavigation('Shopping') }>
            <StyledImage source={ShoppingLogo} />
          </ImageContainer>
        </BottomNavContainer>
      );
    }
  }
}

const BottomNavContainer = styled.View`
  background: ${props => props.color};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ImageContainer = styled.View`
  padding: 15px;
`

const StyledImage = styled.Image`
  width: ${props => props.wide ? '45px' : '40px'};
  height: 40px;
`
