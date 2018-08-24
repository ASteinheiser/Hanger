import React, { Component } from 'react';
import { Avatar }           from 'react-native-material-ui';
import styled               from 'styled-components/native';

import TopNavigation    from '../../components/top-navigation.js';
import theme            from '../../theme.js';

export default class ProfileUpload extends Component {
  render() {
    return(
      <Height>

        <TopNavigation
          back-button
          route='/profile'
          title='Edit Profile Info'
          navigation={this.props.navigation}>
          <Container color={theme.palette.canvasColor}>

            <StyledText color={theme.palette.primaryColor}>
              { 'Edit Profile' }
            </StyledText>

            <Touchable onPress={() => this.props.history.push('/profile-upload')}>
              <Avatar icon='person' iconColor='gray' size={80} iconSize={60} />
            </Touchable>

          </Container>
        </TopNavigation>

      </Height>
    );
  }
}

const Height = styled.View`
  height: 100%;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 100;
`
