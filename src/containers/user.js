import React, { Component } from 'react';
import styled               from 'styled-components/native';

import ProfileHeader       from '../components/profile-header.js';
import ProfileInformation  from '../components/profile-information.js';
import SocialMediaAccounts from '../components/social-media-accounts.js';
import TopNavigation       from '../components/top-navigation.js';
import theme               from '../theme.js';

export default class User extends Component {
  render() {
    const { user } = this.props.location.state;

    console.log(user);

    return (
      <Height>
        <TopNavigation back-button>
          <Container color={theme.palette.canvasColor}>

            {/* <ProfileHeader user={user} />

            <ProfileInformation user={user} />

            <SocialMediaAccounts user={user} /> */}

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
