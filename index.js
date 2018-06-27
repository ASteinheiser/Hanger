import React             from 'react';
import { AppRegistry }   from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';

import theme  from './src/theme.js';
import Router from './src/routers/router.js';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={theme}>
        <Router />
      </ThemeProvider>
    )
  }
}


AppRegistry.registerComponent('Hanger', () => App);
