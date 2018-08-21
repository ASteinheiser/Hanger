import React                 from 'react';
import { View, StyleSheet }  from 'react-native';
import Camera                from 'react-native-camera';

import TopNavigation from '../../components/top-navigation.js';

export default class StyledCamera extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <TopNavigation
          back-button
          route='back'
          title='Camera'
          navigation={this.props.navigation}>

          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            captureTarget={Camera.constants.CaptureTarget.temp}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill} />

        </TopNavigation>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
