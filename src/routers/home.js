import { createStackNavigator } from 'react-navigation';

import Home from '../containers/home.js';

const HomeRoute = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default HomeRoute;
