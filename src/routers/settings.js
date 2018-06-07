import { StackNavigator } from 'react-navigation';

import Settings from '../containers/settings.js';

const SettingsRoute = StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Settings'
  }
);

export default SettingsRoute;
