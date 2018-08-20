import React  from 'react';
import styled from 'styled-components/native';

import BottomNavigation from '../components/bottom-navigation.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

export default class Hive extends React.Component {
  render() {
    return (
      <Height>
        <TopNavigation navigation={this.props.navigation} />

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <Container color={theme.palette.canvasColor}>

            <StyledText color={theme.palette.primaryColor}>
              { 'Hive Page' }
            </StyledText>

          </Container>
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

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
`
