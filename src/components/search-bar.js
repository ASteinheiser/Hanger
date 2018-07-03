import React, { Component } from 'react';
import { Platform }         from 'react-native';
import { Toolbar, Icon }    from 'react-native-material-ui';
import styled               from 'styled-components';

import Input from './input.js';

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
  constructor(props) {
    super(props);

    this.state = {
      editable: false
    };
  }

  handleSearchOpen() {
    this.setState({ editable: true });
  }

  render() {
    return (
      <Toolbar style={ toolbarStyle }
        leftElement={
          <Icon name='search' size={30} color={'white'} />
        }
        centerElement={
          <Input
            accent={true}
            title={'search'}
            placeholder={'Search Events, Gigs, etc.'}
            label={''}
            error={false}
            onChange={this.props.onChange}
            value={this.props.value}
            containerStyle={{ paddingRight: 30 }}
            />
        } />
    );
  }
}
