import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';
import _map                 from 'lodash.map';

import HeaderText    from '../components/header-text.js';
import FavoritesItem from '../components/favorites-item.js';
import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

import SAMPLE_FAVORITES from '../../assets/favorites.json';

export default class Favorites extends React.Component {
  render() {
    const FavoritesItems = _map(SAMPLE_FAVORITES, item =>
      <FavoritesItem
        key={item.id}
        title={item.title}
        image={item.image} />
    );

    return (
      <Flex>
        <TopNavigation navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Favorites' />

          { FavoritesItems }

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
