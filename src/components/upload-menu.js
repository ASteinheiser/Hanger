import React, { Component } from 'react';
import { View, Text }       from 'react-native';
import styled               from 'styled-components/native';

export default class UploadMenu extends Component {
  render() {
    if(!this.props.open) {
      return null;
    }

    return(
      <StyledView>
        <Text>
          {'Hello world!!'}
        </Text>
      </StyledView>
    )
  }
}

const StyledView = styled.View`
  position: absolute;
  bottom: 60;
  left: 0;
  right: 0;
  background: green;
  z-index: 100001;
`
