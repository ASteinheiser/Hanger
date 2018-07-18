import React                        from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Login            from './login.js';
import Upload           from './upload.js';
import Home             from '../containers/home.js';
import Messages         from '../containers/messages.js';
import Shopping         from '../containers/shopping.js';
import Search           from '../containers/search.js';
import Notifications    from '../containers/notifications';
import Profile          from '../containers/profile';
import BottomNavigation from '../components/bottom-navigation.js';

const Router = createBottomTabNavigator(
  {
    'Upload': {
      screen: Upload
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
    'Shopping': {
      screen: Shopping
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
