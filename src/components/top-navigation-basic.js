import React, { Component }           from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Avatar, Toolbar, Icon }      from 'react-native-material-ui';
import Image                          from 'react-native-scalable-image';
import styled                         from 'styled-components';

import logo from '../../assets/hanger-text-logo-white.png';

let iosTopPadding = { container: {} };
if (Platform.OS === 'ios') {
  iosTopPadding.container = {
    paddingTop: 30,
    height: 90
  };
}

export default class TopNavigationBasic extends Component {
  render() {
    return (
      <Toolbar style={ iosTopPadding }
        centerElement={
          <Centered>
            <Image source={logo} height={40} />
          </Centered>
        }
        leftElement={
          this.props['no-buttons'] || this.props['back-button'] ?
            this.props['back-button'] ?
              <MarginLeft>
                <Touchable onPress={() => this.props.navigation.replace(this.props.route)}>
                  <Icon name='arrow-back' color='white' size={30} />
                </Touchable>
              </MarginLeft>
              :
              null
            :
            <MarginLeft>
              <Avatar icon='person' iconColor='gray' size={35} iconSize={25} />
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
              <Icon name='notifications' color='white' size={30} />
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
