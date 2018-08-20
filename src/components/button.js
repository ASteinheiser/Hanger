import React, { Component } from 'react';
import { Button }           from 'react-native-material-ui';

import theme, { white } from '../theme.js';

export default class StyledButton extends Component {
  render() {
    var buttonStyle = {
      container: {
        height: 50,
        borderWidth: 2,
        borderColor: theme.palette.primaryColor,
        borderRadius: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25
      },
      text: {
        fontFamily: theme.fontFamily ? theme.fontFamily : 'Roboto',
        color: this.props.primary ? white : theme.palette.primaryColor,
        fontWeight: 'bold',
        fontSize: 16
      }
    }

    if (this.props.small) {
      buttonStyle.container.height = 25;
      buttonStyle.text.fontSize = 14;
    }

    if (this.props.large) {
      buttonStyle.container.height = 60;
      buttonStyle.text.fontSize = 18;
    }

    return (
      <Button
        style={buttonStyle}
        {...this.props}
      />
    )
  }
}
