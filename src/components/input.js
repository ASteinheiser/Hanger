import React         from 'react';
import { TextField } from 'react-native-material-textfield';

import theme from '../theme.js';

export default class Input extends React.Component {
  render() {
    const MAIN_COLOR = this.props.accent ? theme.palette.accentColor : theme.palette.primaryColor;
    const DISABLED_COLOR = theme.palette.disabledColor;
    const TEXT_COLOR = this.props.accent ? theme.palette.accentColor : theme.palette.primaryTextColor;

    return (
      <TextField
        baseColor={ DISABLED_COLOR }
        tintColor={ MAIN_COLOR }
        textColor={ TEXT_COLOR }
        onChangeText={this.props.onChange}
        {...this.props}
      />
    )
  }
}
