import { StackNavigator } from 'react-navigation';

import Home from '../containers/home.js';

const HomeRoute = StackNavigator(
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
