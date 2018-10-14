import React, { Component } from 'react';
import { API }              from 'aws-amplify';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';

import CommentSection  from '../components/comment-section';
import TopNavigation   from '../components/top-navigation.js';
import FeedPost        from '../components/feed-post';
import theme, { blue } from '../theme.js';

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;

    API.get('HangerAPI', `/v1/user/post/${id}`)
      .then(res => {
        this.setState({ post: res });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { post } = this.state;

    if(post === null) {
      return(
        <Height>
          <TopNavigation back-button>
            <Centered>
              <DotIndicator color={blue} size={18} />
            </Centered>
          </TopNavigation>
        </Height>
      );
    }

    const { id, user_id, description, img_uri, comments } = post;

    return (
      <Height>
        <TopNavigation back-button>
          <Container color={theme.palette.canvasColor}>

            <FeedPost
              id={id}
              userId={user_id}
              description={description}
              image={img_uri}
              no_comment />

            <CommentSection
              id={id}
              comments={comments} />

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

  padding-top: 15px;
`

const Centered = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`
