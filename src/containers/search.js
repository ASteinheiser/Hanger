import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import HeaderText         from '../components/header-text.js';
import FeedPost           from '../components/feed-post.js';
import SearchBar          from '../components/search-bar.js';
import theme              from '../theme.js';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };
  }

  onChange(e) {
    this.setState({ searchValue: e });
  }

  render() {
    return (
      <Flex>

        <SearchBar
          onChange={this.onChange.bind(this)}
          value={this.state.searchValue} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Explore Events, Gigs, etc!' small />

          <FeedPost
            title={'Phoenix Fashion Week 2018'}
            image={'https://www.zonamedspa.com/wp-content/uploads/PHXFW.16-Silver-Flyer.jpg'} />

          <FeedPost
            title={'Photographer and 2 Models needed for Paid Photoshoot'}
            image={'https://i.pinimg.com/736x/d6/7a/3b/d67a3bac1c2deb60e02dd8373db472a0--behind-the-scenes-shooting.jpg'} />

        </Container>

      </Flex>
    )
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`
