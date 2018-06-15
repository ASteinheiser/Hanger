import React         from 'react';
import { TextInput } from 'react-native';

import theme from '../theme.js';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      borderColor: theme.palette.disabledColor
    };
  }

  render() {
    return (
      <TextInput
        numberOfLines={1}
        autoCorrect={false}
        returnKeyType={'done'}
        underlineColorAndroid='rgba(0,0,0,0.0)'
        onFocus={() => this.setState({ borderColor: theme.palette.primaryColor })}
        onBlur={() => this.setState({ borderColor: theme.palette.disabledColor })}
        selectionColor={theme.palette.secondaryTextColor}
        placeholderTextColor={theme.palette.primaryTextColor}
        style={{
          borderBottomWidth: 2,
          borderColor: this.state.borderColor,
          color: theme.palette.primaryTextColor,
          fontFamily: theme.fontFamily,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 30,
          paddingLeft: 5,
          paddingRight: 0,
          paddingBottom: 5,
          paddingTop: 0,
          fontSize: 18,
        }}
        {...this.props}
      />
    )
  }
}
