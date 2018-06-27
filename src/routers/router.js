import React                        from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Login            from './login.js';
import Camera           from '../containers/camera.js';
import Home             from '../containers/home.js';
import Messages         from '../containers/messages.js';
import ShoppingCart     from '../containers/shopping-cart.js';
import Work             from '../containers/work.js';
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
    'ShoppingCart': {
      screen: ShoppingCart
    },
    'Work': {
      screen: Work
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
