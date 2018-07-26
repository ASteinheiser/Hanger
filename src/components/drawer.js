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
        <StyledText color={theme.palette.accentColor}>
          {'Notifications'}
        </StyledText>
        <StyledText color={theme.palette.accentColor}>
          {'Hive'}
        </StyledText>
        <StyledText color={theme.palette.accentColor}>
          {'Projects'}
        </StyledText>
        <StyledText color={theme.palette.accentColor}>
          {'Settings'}
        </StyledText>
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
