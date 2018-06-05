import React                        from 'react';
import { createBottomTabNavigator } from 'react-navigation';

// import BottomNavigation from './components/bottom-navigation.js';
import Home             from './routers/home.js';

const Router = createBottomTabNavigator(
  {
    'Home': {
      screen: Home
    }
  },
  {
    initialRouteName: 'Home',
    // tabBarComponent: props => <BottomNavigation {...props} />
  }
);

export default Router;
