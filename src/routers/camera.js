import { createStackNavigator } from 'react-navigation';

import Camera from '../containers/camera.js';

const CameraRoute = createStackNavigator(
  {
    Camera: {
      screen: Camera,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Camera'
  }
);

export default CameraRoute;
