import React  from 'react';
import styled from 'styled-components/native';

import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

export default class Settings extends React.Component {
  render() {
    return (
      <Height>
        <TopNavigation navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          <StyledText color={theme.palette.primaryColor}>
            { 'Settings Page' }
          </StyledText>

        </Container>
      </Height>
    );
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

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
`
