import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import NotificationItem from '../components/notification-item.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

import SAMPLE_NOTIFICATIONS from '../../assets/data/notifications.json';

export default class Notifications extends React.Component {
  render() {
    const Notifications = _map(SAMPLE_NOTIFICATIONS, notif =>
      <NotificationItem
        key={notif.id}
        text={notif.text}
        username={notif.username}
        timestamp={notif.timestamp}/>
    );

    return (
      <Flex>
        <TopNavigation
          title='Notifications'
          navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          { Notifications }

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
