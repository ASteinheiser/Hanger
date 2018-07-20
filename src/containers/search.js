import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _debounce            from 'lodash.debounce';

import HeaderText from '../components/header-text.js';
import FeedPost   from '../components/feed-post.js';
import SearchBar  from '../components/search-bar.js';
import theme      from '../theme.js';

const SEARCH_DEBOUNCE_TIME = 2000; // 2 seconds

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ''
    };

    this._searchEvents = _debounce(this.searchEvents, SEARCH_DEBOUNCE_TIME);
  }

  searchEvents() {
    console.log('Searching for events: ', this.state.searchValue);
  }

  onChange(e) {
    this.setState({ searchValue: e }, () => {
      this._searchEvents();
    });
  }

  render() {
    return (
      <Height>

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

      </Height>
    )
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
