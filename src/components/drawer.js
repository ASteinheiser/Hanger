import React, { Component } from 'react';
import styled               from 'styled-components/native';

import ProjectsLogo  from '../../assets/icons/spiral-white.png';
import HiveLogo      from '../../assets/icons/hive-white.png';
import SettingsLogo  from '../../assets/icons/settings-white.png';
import Notifications from '../../assets/icons/bullhorn-white.png';

import theme from '../theme.js';

export default class Drawer extends Component {

  handleNavigation(route) {
    this.props.close();
    this.props.history.push(route);
  }

  render() {
    if(this.props.open !== true) {
      return null;
    }

    return(
      <StyledView color={theme.palette.primaryColor}>
        <Touchable onPress={this.handleNavigation.bind(this, '/notifications')}>
          <DrawerContainer top_pad>
            <ButtonIcon source={Notifications} />
            <StyledText color={theme.palette.accentColor}>
              {'Notifications'}
            </StyledText>
          </DrawerContainer>
        </Touchable>
        <Touchable onPress={this.handleNavigation.bind(this, '/hive')}>
          <DrawerContainer>
            <ButtonIcon source={HiveLogo} />
            <StyledText color={theme.palette.accentColor}>
              {'Hive'}
            </StyledText>
          </DrawerContainer>
        </Touchable>
        <Touchable onPress={this.handleNavigation.bind(this, '/projects')}>
          <DrawerContainer>
            <ButtonIcon source={ProjectsLogo} />
            <StyledText color={theme.palette.accentColor}>
              {'Projects'}
            </StyledText>
          </DrawerContainer>
        </Touchable>
        <Touchable onPress={this.handleNavigation.bind(this, '/settings')}>
          <DrawerContainer bottom_pad>
            <ButtonIcon source={SettingsLogo} />
            <StyledText color={theme.palette.accentColor}>
              {'Settings'}
            </StyledText>
          </DrawerContainer>
        </Touchable>
      </StyledView>
    )
  }
}

const StyledView = styled.ScrollView`
  background: ${props => props.color};

  position: absolute;
  top: 60;
  bottom: 0;
  left: 0;
  border-bottom-color: white;
  border-bottom-width: 1px;
`

const DrawerContainer = styled.View`
  display: flex;
  flex-direction: row;

  padding-left: 25px;
  padding-right: 50px;
  padding-top: ${props => props.top_pad ? '50px' : '20px'};
  padding-bottom: ${props => props.bottom_pad ? '50px' : '20px'};
`

const StyledText = styled.Text`
  font-size: 24px;
  color: ${props => props.color};
  padding-left: 25px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 1001;
`

const ButtonIcon = styled.Image`
  width: 30px;
  height: 30px;
`
