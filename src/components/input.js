import React         from 'react';
import { TextField } from 'react-native-material-textfield';

import theme from '../theme.js';

export default class Input extends React.Component {
  render() {
    const MAIN_COLOR = this.props.accent ? theme.palette.primaryColor : 'white';
    const DISABLED_COLOR = this.props.accent ? theme.palette.primaryColor : 'white';
    const TEXT_COLOR = this.props.accent ? theme.palette.primaryColor : 'white';

    return (
      <TextField
        baseColor={ DISABLED_COLOR }
        tintColor={ MAIN_COLOR }
        textColor={ TEXT_COLOR }
        errorColor={ '#ff273d' }
        fontSize={18}
        onChangeText={(event) => this.props.onChange(event)}
        {...this.props}
      />
    )
  }
}
