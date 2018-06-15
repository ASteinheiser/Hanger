import React, { Component } from 'react';
import { Button }           from 'react-native-material-ui';

import theme from '../theme.js';

export default class StyledButton extends Component {
  render() {
    var buttonStyle = {
      container: {
        height: 50
      },
      text: {
        fontFamily: theme.fontFamily ? theme.fontFamily : 'Roboto',
        color: this.props.accent ? theme.palette.secondaryTextColor : theme.palette.primaryTextColor,
        fontWeight: 'bold',
        fontSize: 16
      }
    }

    return (
      <Button
        raised
        style={buttonStyle}
        {...this.props}
      />
    )
  }
}
