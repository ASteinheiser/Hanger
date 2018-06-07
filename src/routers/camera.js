import { StackNavigator } from 'react-navigation';

import Camera from '../containers/camera.js';

const CameraRoute = StackNavigator(
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
