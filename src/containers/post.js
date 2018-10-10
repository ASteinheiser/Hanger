import React, { Component } from 'react';
import styled               from 'styled-components/native';

import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

export default class Post extends Component {
  render() {
    return (
      <Height>
        <TopNavigation back-button>
          <Container color={theme.palette.canvasColor}>
            {/* post cpntent */}
          </Container>
        </TopNavigation>
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

  padding-top: 15px;
`
