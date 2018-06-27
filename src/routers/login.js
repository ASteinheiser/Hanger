import { createStackNavigator } from 'react-navigation';

import Login          from '../containers/auth/login.js';
import Register       from '../containers/auth/register.js';
import ForgotPassword from '../containers/auth/forgot-password.js';

const LoginRoute = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export default LoginRoute;
