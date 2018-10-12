import React, { Component } from 'react';
import { GiftedChat }       from 'react-native-gifted-chat';
import styled               from 'styled-components/native';

import TopNavigation from '../components/top-navigation.js';

export default class MessageView extends Component {

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://northbridgecos.com/wp-content/uploads/2016/01/sample4_l.jpg',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return(
      <Height>
        <TopNavigation back-button title={'Other Users name'}>

          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }} />

        </TopNavigation>
      </Height>
    );
  }
}

const Height = styled.View`
  height: 100%;
`
