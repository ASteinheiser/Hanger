import { StackNavigator } from 'react-navigation';

import ShoppingCart from '../containers/shopping-cart.js';

const ShoppingCartRoute = StackNavigator(
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
