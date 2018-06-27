import { createStackNavigator } from 'react-navigation';

import ShoppingCart from '../containers/shopping-cart.js';

const ShoppingCartRoute = createStackNavigator(
  {
    ShoppingCart: {
      screen: ShoppingCart,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'ShoppingCart'
  }
);

export default ShoppingCartRoute;
