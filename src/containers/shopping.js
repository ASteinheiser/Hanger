import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation  from '../components/bottom-navigation.js';
import TopNavigation     from '../components/top-navigation.js';
import UnderConstruction from '../components/under-construction.js';
import theme             from '../theme.js';

export default class Shopping extends React.Component {
  render() {
    return (
      <Height>

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <TopNavigation navigation={this.props.navigation}>
            <Container color={theme.palette.canvasColor}>

              <UnderConstruction title='Shopping' />

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
  flex: 1;
`
