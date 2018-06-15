import { StackNavigator } from 'react-navigation';

import Login          from '../containers/login.js';
import Register       from '../containers/register.js';
import ForgotPassword from '../containers/forgot-password.js';

const LoginRoute = StackNavigator(
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
