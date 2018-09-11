import React, { Component } from 'react';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation from '../components/bottom-navigation.js';
import NotificationItem from '../components/notification-item.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

import SAMPLE_NOTIFICATIONS from '../../assets/data/notifications.json';

export default class Notifications extends Component {
  render() {
    const Notifications = _map(SAMPLE_NOTIFICATIONS, notif =>
      <NotificationItem
        key={notif.id}
        text={notif.text}
        username={notif.username}
        timestamp={notif.timestamp}/>
    );

    return (
      <Height>
        <BottomNavigation>
          <TopNavigation title='Notifications'>
            <Container color={theme.palette.canvasColor}>

              { Notifications }

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
