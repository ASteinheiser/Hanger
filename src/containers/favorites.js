import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import FavoritesItem from '../components/favorites-item.js';
import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

import SAMPLE_FAVORITES from '../../assets/data/favorites.json';

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
        <TopNavigation
          title='Hanger Closet'
          navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

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
