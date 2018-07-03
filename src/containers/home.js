import React                from 'react';
import { View, ScrollView } from 'react-native';
import SplashScreen         from 'react-native-splash-screen';
import styled               from 'styled-components';
import _map                 from 'lodash.map';

import HeaderText         from '../components/header-text.js';
import FeedPost           from '../components/feed-post.js';
import TopNavigationBasic from '../components/top-navigation-basic.js';
import theme              from '../theme.js';

import SAMPLE_POSTS from '../../assets/posts.json';

export default class Home extends React.Component {

  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1000);
  }

  render() {
    const FeedPosts = _map(SAMPLE_POSTS, post =>
      <FeedPost
        key={post.id}
        title={post.title}
        image={post.image} />
    );

    return (
      <Flex>
        <TopNavigationBasic navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Hanger Feed' />

          { FeedPosts }

        </Container>
      </Flex>
    );
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`
