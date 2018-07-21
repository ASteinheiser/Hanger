import React, { Component }              from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled                            from 'styled-components/native';

import CameraLogo from '../../assets/icons/camera-white.png';

import theme from '../theme.js';

export default class UploadMenu extends Component {

  handleCameraClick() {
    this.props.close();
    this.props.history.push('/camera');
  }

  render() {
    if(!this.props.open) {
      return null;
    }

    return(
      <StyledView>
        <CircleContainer color={theme.palette.primaryColor}>
          <Touchable onPress={this.handleCameraClick.bind(this)}>
            <StyledImage source={CameraLogo} />
          </Touchable>
        </CircleContainer>
      </StyledView>
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

  margin-bottom: 15px;
  background: ${props => props.color};

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
`
