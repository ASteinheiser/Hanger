import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Platform }         from 'react-native';
import { withRouter }       from 'react-router-native';
import ScaledImage          from 'react-native-scalable-image';
import styled               from 'styled-components/native';
import { Avatar, Toolbar, Icon } from 'react-native-material-ui';

import Input           from './input.js';
import Drawer          from './drawer.js';
import EditLogo        from '../../assets/icons/edit-pencil-white.png';
import HangerWhiteLogo from '../../assets/icons/hanger-white.png';
import BackLogo        from '../../assets/icons/back-white.png';
import HangerTextLogo  from '../../assets/logos/hanger-text-only-white.png';
import CloseIcon       from '../../assets/icons/close-white.png';
import theme           from '../theme.js';

let toolbarStyle = { container: {} };
if (Platform.OS === 'ios') {
  toolbarStyle.container = { // iOS needs extra padding to look good
    paddingTop: 20,
    height: 70
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
    let { children, ...otherProps } = this.props;
    toolbarStyle.leftElementContainer = {};

    if(this.props.type === 'search') {
      toolbarStyle.leftElementContainer = { paddingLeft: 20 };

      return (
        <StyledView>
          <Toolbar style={ toolbarStyle }
            leftElement={
              <Icon name='search' size={30} color={'white'} />
            }
            centerElement={
              <Input
                {...otherProps}
                placeholder={'Search Events, Gigs, etc.'}
                label={''}
                containerStyle={{ paddingRight: 35, paddingBottom: 25 }}
                />
            } />

          { children }

        </StyledView>
      );
    }

    return (
      <StyledView>
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
                <PaddingRight>
                  <ScaledImage source={HangerTextLogo} height={40} />
                </PaddingRight>
              </Centered>
          }
          rightElement={
            this.props['no-buttons'] || this.props['back-button'] || this.props.edit_icon ?
              this.props.edit_icon ?
                <EditLogoPadding>
                  <Touchable onPress={() => this.props.history.push('/edit-profile')}>
                    <ScaledImage source={EditLogo} height={25} />
                  </Touchable>
                </EditLogoPadding>
                :
                <Width />
              :
              <MarginRight>
                <Touchable onPress={() => this.props.history.push('/profile')}>
                {
                  this.props.user.profile_img ?
                    <Avatar
                      size={40}
                      image={
                        <ScaledImage
                          style={{borderRadius: 20}}
                          height={40}
                          width={40}
                          source={{uri: this.props.user.profile_img}} />
                      } />
                    :
                    <Avatar icon='person' iconColor='gray' size={40} iconSize={30} />
                }
                </Touchable>
              </MarginRight>
          }
          leftElement={
            this.props['no-buttons'] || this.props['back-button'] ?
              this.props['back-button'] ?
                <MarginLeft>
                  <Touchable onPress={() => {
                      if(this.props.onpress) {
                        this.props.onpress();
                      }
                      else if(this.props.route) {
                        this.props.history.push(this.props.route);
                      } else {
                        this.props.history.goBack();
                      }
                    } }>
                    <StyledIconImage source={BackLogo} small />
                  </Touchable>
                </MarginLeft>
                :
                <Width />
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

        { children }

        <Drawer
          history={this.props.history}
          open={this.state.showDrawer}
          close={this.toggleDrawer.bind(this)} />

      </StyledView>
    );
  }
}

const StyledView = styled.View`
  height: 100%;
`

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

const PaddingRight = styled.View`
  padding-right: 15px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
`

const Width = styled.View`
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

const EditLogoPadding = styled.View`
  width: 40px;
  margin-right: 15px;

  display: flex;
  align-items: flex-end;
`

const mapStateToProps = ({ user }) => {
  return { user };
}

export default withRouter(connect(mapStateToProps)(TopNavigation));
