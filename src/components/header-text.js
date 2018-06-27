import React, { Component } from 'react';
import { Text }             from 'react-native';
import styled               from 'styled-components';

import theme from '../theme.js';

export default class HeaderText extends Component {
  render() {
    return (
      <StyledText color={theme.palette.secondaryTextColor}>
        { this.props.text }
      </StyledText>
    )
  }
}

const StyledText = styled.Text`
  font-size: 36px;
  color: ${props => props.color};

  text-align: center;
  padding-top: 25px;
`
