import React, { Component } from 'react';
import { Platform, View }   from 'react-native';
import { withRouter }       from 'react-router-native';
import { Avatar, Toolbar }  from 'react-native-material-ui';
import ScaledImage          from 'react-native-scalable-image';
import styled               from 'styled-components/native';

import Drawer          from './drawer.js';
import HangerWhiteLogo from '../../assets/icons/hanger-white.png';
import BackLogo        from '../../assets/icons/back-white.png';
import HangerTextLogo  from '../../assets/logos/hanger-text-only-white.png';
import CloseIcon       from '../../assets/icons/close-white.png';
import theme           from '../theme.js';

let toolbarStyle = { container: {} };
if (Platform.OS === 'ios') {
  toolbarStyle.container = { // iOS needs extra padding to look good
    paddingTop: 30,
    height: 90
  };
}

class TopNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false
    };
  }

  toggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  render() {
    return (
      <View>
        <Toolbar style={ toolbarStyle }
          centerElement={
            this.props.title ?
              <Centered>
                <StyledText color={theme.palette.accentColor}>
                  { this.props.title }
                </StyledText>
              </Centered>
              :
              <Centered>
                <PaddingLeft>
                  <ScaledImage source={HangerTextLogo} height={40} />
                </PaddingLeft>
              </Centered>
          }
          rightElement={
            this.props['no-buttons'] || this.props['back-button'] ?
              this.props['back-button'] ?
                <EmptyWidth />
                :
                <EmptyWidth />
              :
              <MarginRight>
                <Touchable onPress={() => this.props.history.push('/profile')}>
                  <Avatar icon='person' iconColor='gray' size={40} iconSize={30} />
                </Touchable>
              </MarginRight>
          }
          leftElement={
            this.props['no-buttons'] || this.props['back-button'] ?
              this.props['back-button'] ?
                <MarginLeft>
                  <Touchable onPress={() => {
                      if(this.props.route !== 'back') {
                        this.props.history.push(this.props.route);
                      } else {
                        this.props.history.push('/home');
                      }
                    } }>
                    <StyledIconImage source={BackLogo} small />
                  </Touchable>
                </MarginLeft>
                :
                <EmptyWidth />
              :
              <MarginLeft>
                <Touchable onPress={this.toggleDrawer.bind(this)}>
                  {
                    this.state.showDrawer ?
                      <StyledIconImage small source={CloseIcon} />
                      :
                      <StyledIconImage source={HangerWhiteLogo} />
                  }
                </Touchable>
              </MarginLeft>
          } />

        <Drawer
          history={this.props.history}
          open={this.state.showDrawer}
          close={this.toggleDrawer.bind(this)} />

      </View>
    );
  }
}

const Centered = styled.View`
  margin: 0 auto;
`

const MarginRight = styled.View`
  margin-right: 10px;
  width: 40px;
`

const MarginLeft = styled.View`
  margin-left: 10px;
`

const PaddingLeft = styled.View`
  padding-left: 25px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
`

const EmptyWidth = styled.View`
  width: 40px;
`

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
  padding-right: 15px;
`

const StyledIconImage = styled.Image`
  width: ${props => props.small ? 25 : 40};
  height: ${props => props.small ? 25 : 40};
  margin-right: ${props => props.small ? 10 : 0 };
  margin-left: ${props => props.small ? 5 : 0 };
`

export default withRouter(TopNavigation);
