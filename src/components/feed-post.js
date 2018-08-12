import React                 from 'react';
import { View, Text, Image } from 'react-native';
import { Avatar }            from 'react-native-material-ui';
import styled                from 'styled-components/native';

import theme from '../theme.js';

export default class FeedPost extends React.Component {
  render() {
    return (
      <PostContainer>
        <UserInfoContainer>
          <Touchable onPress={() => {console.log('profile click!')}}>
            <Avatar icon='person' iconColor='gray' size={40} iconSize={30} />
          </Touchable>

          <Touchable onPress={() => {console.log('profile click!')}}>
            <UsernameText color={theme.palette.primaryColor}>
              { 'John Username' }
            </UsernameText>
          </Touchable>
        </UserInfoContainer>

        <StyledImage source={{ uri: this.props.image }} alt='feed_post' />

        <StyledText color={theme.palette.primaryTextColor}>
          { this.props.title }
        </StyledText>
      </PostContainer>
    )
  }
}

const PostContainer = styled.View`
  margin-top: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
`

const StyledText = styled.Text`
  font-size: 16px;
  color: ${props => props.color};

  margin: 15px;
`

const StyledImage = styled.Image`
  height: 400px;
  width: 100%;
`

const UserInfoContainer = styled.View`
  padding-bottom: 15px;
  padding-left: 25px;

  display: flex;
  flex-direction: row;
`

const UsernameText = styled.Text`
  font-size: 18px;
  color: ${props => props.color};

  padding-left: 15px;
  text-align: center;

  margin: auto 0;
`

const Touchable = styled.TouchableOpacity`
  z-index: 101;
`
