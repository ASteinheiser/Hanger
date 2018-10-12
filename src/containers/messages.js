import React, { Component } from 'react';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation from '../components/bottom-navigation.js';
import MessageItem      from '../components/message-item.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

import SAMPLE_MESSAGES from '../../assets/data/messages.json';

export default class Messages extends Component {
  render() {
    const Conversations = _map(SAMPLE_MESSAGES, conversation =>
      <MessageItem
        onPress={() => {
          this.props.history.push(`/message/${conversation.id}`)
        }}
        key={conversation.id}
        user={conversation.user}
        text={conversation.text}
        timestamp={conversation.timestamp} />
    );

    return (
      <Height>
        <BottomNavigation>
          <TopNavigation title='Messages'>
            <Container color={theme.palette.canvasColor}>

              { Conversations }

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
