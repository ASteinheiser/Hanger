import React                        from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import BottomNavigation from './components/bottom-navigation.js';
import Camera           from './routers/camera.js';
import Home             from './routers/home.js';
import Messages         from './routers/messages.js';
import Settings         from './routers/settings.js';
import Work             from './routers/work.js';

const Router = createBottomTabNavigator(
  {
    'Camera': {
      screen: Camera
    },
    'Home': {
      screen: Home
    },
    'Messages': {
      screen: Messages
    },
    'Settings': {
      screen: Settings
    },
    'Work': {
      screen: Work
    }
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: props => <BottomNavigation {...props} />
  }
);

export default Router;
