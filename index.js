import React             from 'react';
import Amplify           from 'aws-amplify';
import { AppRegistry }   from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import SplashScreen      from 'react-native-splash-screen';

import aws_config from './src/aws-config.js';
import Router     from './src/router.js';
import theme      from './src/theme.js';

Amplify.configure(aws_config);

class App extends React.Component {
  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1500);
  }

  render() {
    return (
      <ThemeProvider uiTheme={theme}>
        <Router />
      </ThemeProvider>
    )
  }
}


AppRegistry.registerComponent('Hanger', () => App);
