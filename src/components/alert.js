import React, { Component } from 'react';
import styled               from 'styled-components/native';

export default class Alert extends Component {
  render() {
    if(this.props.message.length > 0) {
      return (
        <StyledText>
          { this.props.message }
        </StyledText>
      );
    } else {
      return null;
    }
  }
}

const StyledText = styled.Text`
  color: red;
  font-size: 16px;
  text-align: center;
`
