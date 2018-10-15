import React, { Component } from 'react';
import { API }              from 'aws-amplify';
import styled               from 'styled-components/native';
import _debounce            from 'lodash.debounce';
import { Icon, Toolbar }    from 'react-native-material-ui';
import _map                 from 'lodash.map';

import BottomNavigation from '../components/bottom-navigation.js';
import HeaderText       from '../components/header-text.js';
import FeedPost         from '../components/feed-post.js';
import Input            from '../components/input.js';
import TopNavigation    from '../components/top-navigation.js';
import SearchItem       from '../components/search-item.js';
import theme            from '../theme.js';

const SEARCH_DEBOUNCE_TIME = 750; // .75 seconds

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      searchResults: null
    };

    this._searchEvents = _debounce(this.searchEvents, SEARCH_DEBOUNCE_TIME);
  }

  searchEvents() {
    const { searchValue } = this.state;

    if(searchValue !== '') {
      API.get('HangerAPI', `/v1/user/search?search=${searchValue}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onChange(e) {
    this.setState({ searchValue: e }, () => {
      this._searchEvents();
    });
  }

  render() {
    const toolbarStyle = {
      leftElementContainer: {
        paddingLeft: 25,
        paddingTop: 10
      }
    }

    const { searchResults } = this.state;
    let results = null;

    if(searchResults) {
      results = _map(searchResults, result =>
        <SearchItem
          onPress={() => {}}
          key={result.id}
          text={result.text} />
      );
    }

    return (
      <Height>
        <BottomNavigation>
          <TopNavigation>

            <Toolbar style={ toolbarStyle }
              leftElement={
                <Icon
                  name='search'
                  size={30}
                  color={'white'} />
              }
              centerElement={
                <Input
                  containerStyle={{ paddingRight: 25, paddingBottom: 25 }}
                  onChange={this.onChange.bind(this)}
                  label='Search Events and Users'
                  value={this.state.searchValue}
                  error={''} />
              } />

              <Container color={theme.palette.canvasColor}>
                { results }
              </Container>

          </TopNavigation>
        </BottomNavigation>
      </Height>
    )
  }
}

const Height = styled.View`
  height: 100%;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
`
