import React, { Component } from 'react';
import { withRouter }       from 'react-router-native';
import ImagePicker          from 'react-native-image-picker';
import styled               from 'styled-components/native';

import CameraLogo from '../../assets/icons/camera-white.png';
import TextLogo   from '../../assets/icons/text-white.png';
import VideoLogo  from '../../assets/icons/video-white.png';

import theme from '../theme.js';

class UploadMenu extends Component {

  handleCameraClick() {
    this.props.close();

    var pickerOptions = {
      title: 'Upload a Photo',
      mediaType: 'photo'
    };
    ImagePicker.showImagePicker(pickerOptions, (response) => {
      if (response.didCancel) {
        // that's okay, do nothing
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let imageUri = response.uri;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.props.history.push(`/post?image=${imageUri}`);
      }
    });
  }

  render() {
    if(!this.props.open) {
      return null;
    }

    return(
      <FullScreen>
        <StyledView>
          {/* <CircleContainer color={theme.palette.primaryColor}>
            <StyledImage source={VideoLogo} />
          </CircleContainer> */}

          <CircleContainer color={theme.palette.primaryColor}>
            <Touchable onPress={this.handleCameraClick.bind(this)}>
              <StyledImage source={CameraLogo} />
            </Touchable>
          </CircleContainer>

          {/* <CircleContainer color={theme.palette.primaryColor}>
            <StyledImage source={TextLogo} />
          </CircleContainer> */}
        </StyledView>

        <TouchableBackground onPress={() => this.props.close()}/>
      </FullScreen>
    )
  }
}

const StyledView = styled.View`
  position: absolute;
  bottom: 60;
  left: 0;
  right: 0;

  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`

const CircleContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  margin: 0 10px 15px 10px;
  background: ${props => props.color};

  display: flex;
  justify-content: center;
  align-items: center;

  border-width: 2px;
  border-color: white;
`

const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
`

const TouchableBackground = styled.TouchableOpacity`
  z-index: 99;

  position: absolute;
  top: 0;
  bottom: 140;
  left: 0;
  right: 0;
`

const FullScreen = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export default withRouter(UploadMenu);
