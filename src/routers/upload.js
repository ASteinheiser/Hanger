import { createStackNavigator } from 'react-navigation';

import Camera from '../containers/upload/camera.js';

const UploadRoute = createStackNavigator(
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

export default UploadRoute;
