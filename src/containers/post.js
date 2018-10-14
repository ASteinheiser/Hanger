import React, { Component } from 'react';
import styled               from 'styled-components/native';

import TopNavigation from '../components/top-navigation.js';
import FeedPost      from '../components/feed-post';
import theme         from '../theme.js';

export default class Post extends Component {
  render() {
    return (
      <Height>
        <TopNavigation back-button>
          <Container color={theme.palette.canvasColor}>

            <FeedPost
              // key={post.id}
              // userId={post.user_id}
              // description={post.description}
              // image={post.img_uri}
              no_comment />

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
