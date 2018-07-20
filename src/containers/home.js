import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import FeedPost      from '../components/feed-post.js';
import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

import SAMPLE_POSTS from '../../assets/data/posts.json';

export default class Home extends React.Component {
  render() {
    const FeedPosts = _map(SAMPLE_POSTS, post =>
      <FeedPost
        key={post.id}
        title={post.title}
        image={post.image} />
    );

    return (
      <Height>
        <TopNavigation navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          { FeedPosts }

        </Container>
      </Height>
    );
  }
}

const Height = styled.View`
  height: 100%;
  padding-bottom: 60px;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`
