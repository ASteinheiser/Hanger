import React, { Component }      from 'react';
import { Avatar, Toolbar, Icon } from 'react-native-material-ui';
import Image                     from 'react-native-scalable-image';
import styled                    from 'styled-components';

import logo from '../../assets/hanger-text-logo-white.png';

export default class TopNavigationBasic extends Component {
  render() {
    return (
      <Toolbar centerElement={
        <Centered>
          <Image source={logo} height={40} />
        </Centered>
      }
      leftElement={
        <MarginLeft>
          <Avatar icon='person' iconColor='gray' size={35} iconSize={25} />
        </MarginLeft>
      }
      rightElement={
        <MarginRight>
          <Icon name='notifications' color='white' size={30} />
        </MarginRight>
      } />
    );
  }
}

const Centered = styled.View`
  padding-right: 20px;
  margin: 0 auto;
`

const MarginRight = styled.View`
  margin-right: 10px;
`

const MarginLeft = styled.View`
  margin-left: 10px;
`
