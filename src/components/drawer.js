import React, { Component } from 'react';
import styled               from 'styled-components/native';

import theme from '../theme.js';

export default class Drawer extends Component {

  handleNavigation(route) {
    this.props.close();
    this.props.history.push(route);
  }

  render() {
    if(this.props.open !== true) {
      return null;
    }

    return(
      <StyledView color={theme.palette.primaryColor}>
        <Touchable onPress={this.handleNavigation.bind(this, '/notifications')}>
          <StyledText color={theme.palette.accentColor} top>
            {'Notifications'}
          </StyledText>
        </Touchable>
        <Touchable onPress={this.handleNavigation.bind(this, '/hive')}>
          <StyledText color={theme.palette.accentColor}>
            {'Hive'}
          </StyledText>
        </Touchable>
        <Touchable onPress={this.handleNavigation.bind(this, '/projects')}>
          <StyledText color={theme.palette.accentColor}>
            {'Projects'}
          </StyledText>
        </Touchable>
        <Touchable onPress={this.handleNavigation.bind(this, '/settings')}>
          <StyledText color={theme.palette.accentColor} bottom>
            {'Settings'}
          </StyledText>
        </Touchable>
      </StyledView>
    )
  }
}

const StyledView = styled.ScrollView`
  background: ${props => props.color};

  position: absolute;
  top: 60;
  bottom: 0;
  left: 0;
  border-bottom-color: white;
  border-bottom-width: 1px;
`

const StyledText = styled.Text`
  font-size: 24px;
  color: ${props => props.color};

  padding-left: 25px;
  padding-right: 50px;
  padding-top: ${props => props.top ? '50px' : '20px'};
  padding-bottom: ${props => props.bottom ? '50px' : '20px'};
`

const Touchable = styled.TouchableOpacity`
  z-index: 1001;
`
