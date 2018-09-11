import React             from 'react';
import Amplify           from 'aws-amplify';
import { Provider }      from 'react-redux';
import { PersistGate }   from 'redux-persist/integration/react';
import { DotIndicator }  from 'react-native-indicators';
import { AppRegistry }   from 'react-native';
import SplashScreen      from 'react-native-splash-screen';
import styled            from 'styled-components/native';
import { ThemeContext, getTheme } from 'react-native-material-ui';

import aws_config from './src/aws-config.js';
import Router     from './src/router.js';

import theme, { blue }      from './src/theme.js';
import { store, persistor } from './src/redux/config';

Amplify.configure(aws_config);

class App extends React.Component {
  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1500);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <Centered>
              <DotIndicator color={blue} size={12} />
            </Centered>
          } persistor={persistor}>
          <ThemeContext.Provider value={getTheme(theme)}>
            <Router />
          </ThemeContext.Provider>
        </PersistGate>
      </Provider>
    );
  }
}

const Centered = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`

AppRegistry.registerComponent('Hanger', () => App);
