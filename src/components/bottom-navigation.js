import React, { Component }              from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { withRouter }                    from 'react-router-native';
import styled                            from 'styled-components/native';

import Button        from '../components/button.js';
import Header        from '../components/header-text.js';
import TopNavigation from '../components/top-navigation.js';
import HomeLogo      from '../../assets/icons/home-white.png';
import SearchLogo    from '../../assets/icons/search-white.png';
import PlusLogo      from '../../assets/icons/plus-white.png';
import MessageLogo   from '../../assets/icons/messages-white.png';
import ShoppingLogo  from '../../assets/icons/shopping-cart-white.png';
import UploadMenu    from './upload-menu.js';

import theme from '../theme.js';

class BottomNav extends Component {
  constructor(props) {
    super(props);

    let currentRoute = props.location.pathname;

    this.state = {
      active: currentRoute,
      shouldHideNav: this.shouldHideNav(currentRoute),
      showUploadMenu: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentRoute = nextProps.location.pathname;

    if (currentRoute !== this.state.active) {
      this.setState({
        active: currentRoute,
        shouldHideNav: this.shouldHideNav(currentRoute)
      });
      return true;
    } else if (nextProps.showUploadMenu !== this.state.showUploadMenu) {
      return true;
    } else {
      return false;
    }
  }

  handleNavigation(route) {
    this.setState({ active: route, shouldHideNav: this.shouldHideNav(route) });
    this.props.history.push(route);
  }

  shouldHideNav(route) {
    if(route === '/' || route === '/register' || route === '/camera'
      || route === '/forgot-password' || route === '/check-email'
      || route === '/new-password' || route === '/post-registration') {
      return true;
    } else {
      return false;
    }
  }

  handleToggleUploadMenu() {
    this.setState({ showUploadMenu: !this.state.showUploadMenu });
  }

  handleBackToLogin() {
    let route = '/';
    this.props.setuser();
    this.setState({ active: route, shouldHideNav: this.shouldHideNav(route) });
    this.props.history.push(route);
  }

  render() {
    return (
      <FullScreen>

        {
          this.props.user === 'viewPublicFeed' && this.props.location.pathname !== '/home' ?
            <Height>
              <TopNavigation navigation={this.props.navigation} />

              <Header text='Please login to use this feature' />

              <Margin>
                <Button
                  primary
                  icon='subdirectory-arrow-right'
                  text='Login'
                  onPress={this.handleBackToLogin.bind(this)} />
              </Margin>
            </Height>
            :
            this.props.children
        }

        <UploadMenu
          open={this.state.showUploadMenu}
          history={this.props.history}
          close={this.handleToggleUploadMenu.bind(this)} />

        {
          this.state.shouldHideNav ?
            null
            :
            <BottomNavContainer color={theme.palette.primaryColor}>
              <Touchable onPress={this.handleNavigation.bind(this, '/home')}>
                <StyledImage source={HomeLogo} />
              </Touchable>
              <Touchable onPress={this.handleNavigation.bind(this, '/search')}>
                <StyledImage source={SearchLogo} />
              </Touchable>
              <Touchable onPress={this.handleToggleUploadMenu.bind(this)}>
                <StyledImage source={PlusLogo} />
              </Touchable>
              <Touchable onPress={this.handleNavigation.bind(this, '/messages')}>
                <StyledImage source={MessageLogo} />
              </Touchable>
              <Touchable onPress={this.handleNavigation.bind(this, '/shopping')}>
                <StyledImage source={ShoppingLogo} />
              </Touchable>
            </BottomNavContainer>
        }
      </FullScreen>
    );
  }
}

const FullScreen = styled.View`
  display: flex;
  flex: 1;
`

const BottomNavContainer = styled.View`
  background: ${props => props.color};

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-basis: 60px;
  flex-direction: row;
  justify-content: space-between;
`

const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
  padding: 15px 20px;
`

const Height = styled.ScrollView`
  height: 100%;
`

const Margin = styled.View`
  margin: 20px 20px 20px 20px;
`

export default withRouter(BottomNav);
