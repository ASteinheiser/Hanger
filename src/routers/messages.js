import { createStackNavigator } from 'react-navigation';

import Messages from '../containers/messages.js';

const MessagesRoute = createStackNavigator(
  {
    Messages: {
      screen: Messages,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Messages'
  }
);

export default MessagesRoute;
