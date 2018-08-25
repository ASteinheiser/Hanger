import React  from 'react';
import styled from 'styled-components/native';

import BottomNavigation  from '../components/bottom-navigation.js';
import TopNavigation     from '../components/top-navigation.js';
import UnderConstruction from '../components/under-construction.js';
import theme             from '../theme.js';

export default class Projects extends React.Component {
  render() {
    return (
      <Height>

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <TopNavigation navigation={this.props.navigation}>
            <Container color={theme.palette.canvasColor}>

              <UnderConstruction title='Projects' />

            </Container>
          </TopNavigation>
        </BottomNavigation>

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
`
