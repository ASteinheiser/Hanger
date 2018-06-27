import { createStackNavigator } from 'react-navigation';

import Work from '../containers/work.js';

const WorkRoute = createStackNavigator(
  {
    Work: {
      screen: Work,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Work'
  }
);

export default WorkRoute;
