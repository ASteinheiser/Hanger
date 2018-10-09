import React          from 'react';
import { API }        from 'aws-amplify';
import { withRouter } from 'react-router-native';
import { Avatar }     from 'react-native-material-ui';
import styled         from 'styled-components/native';

import CommentIcon   from '../../assets/icons/chat.png';
import HexHeart      from '../../assets/icons/hex-heart.png';
import ClothesHanger from '../../assets/icons/clothes-hanger.png';
import theme         from '../theme.js';

class FeedPost extends React.Component {

  handleProfile() {
    let userId = this.props.userId;

    this.props.history.push(`/user/${userId}`);
  }

  handleLike() {
    let postId = this.props.key;
    let params = {
      body: { }
    };

    API.post('HangerAPI', `/v1/user/post/like/${postId}`, params)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleComment() {
    let postId = this.props.key;
    let params = {
      body: {
        description: 'some-text'
      }
    };

    API.post('HangerAPI', `/v1/user/post/comment/${postId}`, params)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <PostContainer>
        <UserInfoContainer>
          <Touchable onPress={this.handleProfile.bind(this)}>
            <Avatar icon='person' iconColor='gray' size={40} iconSize={30} />
          </Touchable>

          <Touchable onPress={this.handleProfile.bind(this)}>
            <UsernameText color={theme.palette.primaryColor}>
              { 'John Username' }
            </UsernameText>
          </Touchable>
        </UserInfoContainer>

        <StyledImage source={{ uri: this.props.image }} alt='feed_post' />

        {
          this.props.type === 'event' ?
            <EventTitle color={theme.palette.primaryColor}>
              {this.props.title}
            </EventTitle>
            :
            <ButtonsContainer>
              <FlexRow>
                <ButtonPadding onPress={this.handleLike.bind(this)}>
                  <ButtonIcon source={HexHeart} />
                </ButtonPadding>
                <ButtonPadding onPress={this.handleComment.bind(this)}>
                  <ButtonIcon source={CommentIcon} />
                </ButtonPadding>
              </FlexRow>
              <LikesText>
                {
                  this.props.likes ?
                  this.props.likes
                  :
                  '0 Likes'
                }
              </LikesText>
            </ButtonsContainer>
        }

        <StyledText color={theme.palette.primaryTextColor}>
          { this.props.description }
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

  margin: 20px 25px 15px 25px;
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

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  margin-left: 15px;
  margin-top: 15px;
`

const ButtonIcon = styled.Image`
  width: 30px;
  height: 30px;
`

const ButtonPadding = styled.TouchableOpacity`
  padding: 0 10px 0 10px;
`

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
`

const LikesText = styled.Text`
  margin: auto 25px auto 0;
`

const EventTitle = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
  text-align: center;
  padding: 15px;
`

export default withRouter(FeedPost);
