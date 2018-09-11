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
    const Messages = _map(SAMPLE_MESSAGES, message =>
      <MessageItem
        key={message.id}
        user={message.user}
        text={message.text}
        timestamp={message.timestamp} />
    );

    return (
      <Height>
        <BottomNavigation>
          <TopNavigation title='Messages'>
            <Container color={theme.palette.canvasColor}>

              { Messages }

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
