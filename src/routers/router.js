import React                        from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Login            from './login.js';
import Camera           from './camera.js';
import Home             from '../containers/home.js';
import Messages         from '../containers/messages.js';
import Favorites        from '../containers/favorites.js';
import Search           from '../containers/search.js';
import Notifications    from '../containers/notifications';
import Profile          from '../containers/profile';
import BottomNavigation from '../components/bottom-navigation.js';

const Router = createBottomTabNavigator(
  {
    'Camera': {
      screen: Camera
    },
    'Home': {
      screen: Home
    },
    'Login': {
      screen: Login
    },
    'Messages': {
      screen: Messages
    },
    'Favorites': {
      screen: Favorites
    },
    'Search': {
      screen: Search
    },
    'Notifications': {
      screen: Notifications
    },
    'Profile': {
      screen: Profile
    }
  },
  {
    initialRouteName: 'Login',
    tabBarComponent: props => <BottomNavigation {...props} />
  }
);

export default Router;
