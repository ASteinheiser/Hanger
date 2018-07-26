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
      <StyledView>
        <StyledText>
          {'Notifications'}
        </StyledText>
        <StyledText>
          {'Hive'}
        </StyledText>
        <StyledText>
          {'Projects'}
        </StyledText>
        <StyledText>
          {'Settings'}
        </StyledText>
      </StyledView>
    )
  }
}

const StyledView = styled.View`
  background: red;
`

const StyledText = styled.Text`
  font-size: 18px;
`
