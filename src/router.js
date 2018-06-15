import React                        from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import BottomNavigation from './components/bottom-navigation.js';
import Camera           from './routers/camera.js';
import Home             from './routers/home.js';
import Login            from './routers/login.js';
import Messages         from './routers/messages.js';
import ShoppingCart     from './routers/shopping-cart.js';
import Work             from './routers/work.js';

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
    }
  },
  {
    initialRouteName: 'Login',
    tabBarComponent: props => <BottomNavigation {...props} />
  }
);

export default Router;
