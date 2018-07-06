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
          navigation={this.props.navigation} />

        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.temp}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
