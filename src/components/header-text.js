import React, { Component } from 'react';
import { Text }             from 'react-native';
import styled               from 'styled-components';

import theme from '../theme.js';

export default class HeaderText extends Component {
  render() {
    let fontSize = '36px';
    if(this.props.small) {
      fontSize = '28px';
    }
    return (
      <StyledText color={theme.palette.secondaryTextColor} size={fontSize}>
        { this.props.text }
      </StyledText>
    )
  }
}

const StyledText = styled.Text`
  font-size: ${props => props.size};
  color: ${props => props.color};

  text-align: center;
  padding-top: 25px;
  padding-bottom: 10px;
`
