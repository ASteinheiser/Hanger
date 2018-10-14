import React, { Component } from 'react';
import styled               from 'styled-components/native';

import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

export default class Event extends Component {
  render() {
    return (
      <Height>
        <TopNavigation back-button>
          <Container color={theme.palette.canvasColor}>

            {/* <FeedPost
              key={event.id}
              type={'event'}
              date={event.date}
              title={event.name}
              userId={event.user_id}
              description={event.description}
              image={event.img_uri} /> */}

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
