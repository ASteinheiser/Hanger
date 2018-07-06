import React, { Component }           from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { NavigationActions }          from 'react-navigation';
import { Avatar, Toolbar, Icon }      from 'react-native-material-ui';
import Image                          from 'react-native-scalable-image';
import styled                         from 'styled-components';

import logo  from '../../assets/hanger-text-logo-white.png';
import theme from '../theme.js';

let toolbarStyle = { container: {} };
if (Platform.OS === 'ios') {
  toolbarStyle.container = { // iOS needs extra padding to look good
    paddingTop: 30,
    height: 90
  };
}

export default class TopNavigation extends Component {
  render() {
    return (
      <Toolbar style={ toolbarStyle }
        centerElement={
          this.props.title ?
            <Centered>
              <StyledText color={theme.palette.accentColor}>
                { this.props.title }
              </StyledText>
            </Centered>
            :
            <Centered>
              <Image source={logo} height={40} />
            </Centered>
        }
        leftElement={
          this.props['no-buttons'] || this.props['back-button'] ?
            this.props['back-button'] ?
              <MarginLeft>
                <Touchable onPress={() => {
                    if(this.props.route !== 'back') {
                      this.props.navigation.replace(this.props.route);
                    } else {
                      this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
                    }
                  } }>
                  <Icon name='arrow-back' color='white' size={30} />
                </Touchable>
              </MarginLeft>
              :
              null
            :
            <MarginLeft>
              <Touchable onPress={() => this.props.navigation.navigate('Profile')}>
                <Avatar icon='person' iconColor='gray' size={35} iconSize={25} />
              </Touchable>
            </MarginLeft>
        }
        rightElement={
          this.props['no-buttons'] || this.props['back-button'] ?
            this.props['back-button'] ?
              <EmptyWidth />
              :
              null
            :
            <MarginRight>
              <Touchable onPress={() => this.props.navigation.navigate('Notifications')}>
                <Icon name='notifications' color='white' size={30} />
              </Touchable>
            </MarginRight>
        } />
    );
  }
}

const Centered = styled.View`
  margin: 0 auto;
`

const MarginRight = styled.View`
  margin-right: 10px;
  width: 44px;
`

const MarginLeft = styled.View`
  margin-left: 10px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
`

const EmptyWidth = styled.View`
  width: 44px;
`

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
  padding-right: 15px;
`
