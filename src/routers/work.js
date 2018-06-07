import { StackNavigator } from 'react-navigation';

import Work from '../containers/work.js';

const WorkRoute = StackNavigator(
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
