import React, { Component } from 'react';
import { Platform, Text }   from 'react-native';
import { Toolbar }          from 'react-native-material-ui';
import styled               from 'styled-components';

let toolbarStyle = {
  container: {},
  leftElementContainer: {
    paddingLeft: 30
  },
  rightElementContainer: {
    paddingRight: 30
  }
};

if (Platform.OS === 'ios') { // iOS needs extra padding to look good
  toolbarStyle.container = {
    paddingTop: 30,
    height: 90
  };
}

export default class SearchBar extends Component {
  render() {
    return (
      <Toolbar style={ toolbarStyle }
        leftElement={
          <StyledText>
            {'Explore Events, Gigs and More!'}
          </StyledText>
        }
        searchable={{
          autoFocus: true,
          placeholder: 'Search...',
        }} />
    );
  }
}

const StyledText = styled.Text`
  font-size: 16px;
  color: white;
`
