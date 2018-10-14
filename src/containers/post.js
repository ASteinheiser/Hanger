import React, { Component } from 'react';
import styled               from 'styled-components/native';

import CommentSection from '../components/comment-section';
import TopNavigation  from '../components/top-navigation.js';
import FeedPost       from '../components/feed-post';
import theme          from '../theme.js';

export default class Post extends Component {
  render() {
    const { key, userId, description, image, comments } = this.props.location.state;

    return (
      <Height>
        <TopNavigation back-button>
          <Container color={theme.palette.canvasColor}>

            <FeedPost
              key={key}
              userId={userId}
              description={description}
              image={image}
              no_comment />

            <CommentSection
              key={key}
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
