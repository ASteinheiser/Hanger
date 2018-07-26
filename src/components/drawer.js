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
          <StyledText color={theme.palette.accentColor}>
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
          <StyledText color={theme.palette.accentColor}>
            {'Settings'}
          </StyledText>
        </Touchable>
      </StyledView>
    )
  }
}

const StyledView = styled.View`
  background: ${props => props.color};

  padding: 25px 0px;
`

const StyledText = styled.Text`
  font-size: 24px;
  color: ${props => props.color};

  padding: 15px 25px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 1001;
`
