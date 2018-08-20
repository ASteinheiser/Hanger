import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation from '../components/bottom-navigation.js';
import FavoritesItem    from '../components/favorites-item.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

import SAMPLE_FAVORITES from '../../assets/data/favorites.json';

export default class Shopping extends React.Component {
  render() {
    const FavoritesItems = _map(SAMPLE_FAVORITES, item =>
      <FavoritesItem
        key={item.id}
        title={item.title}
        image={item.image} />
    );

    return (
      <Height>
        <TopNavigation
          title='Hanger Closet'
          navigation={this.props.navigation} />

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <Container color={theme.palette.canvasColor}>

            { FavoritesItems }

          </Container>
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
  flex: 1;
`
