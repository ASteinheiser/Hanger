import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import MessageItem   from '../components/message-item.js';
import TopNavigation from '../components/top-navigation.js';
import theme         from '../theme.js';

import SAMPLE_MESSAGES from '../../assets/messages.json';

export default class Messages extends React.Component {
  render() {
    const Messages = _map(SAMPLE_MESSAGES, message =>
      <MessageItem
        key={message.id}
        user={message.user}
        text={message.text}
        timestamp={message.timestamp} />
    );

    return (
      <Flex>
        <TopNavigation
          title='Messages'
          navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          { Messages }

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
