import React, { Component } from 'react';
import { connect }          from 'react-redux';
import styled               from 'styled-components/native';

import Button              from '../components/button.js'
import BottomNavigation    from '../components/bottom-navigation.js';
import ProfileHeader       from '../components/profile-header.js';
import ProfileInformation  from '../components/profile-information.js';
import SocialMediaAccounts from '../components/social-media-accounts.js';
import TopNavigation       from '../components/top-navigation.js';
import theme               from '../theme.js';

class Profile extends Component {
  render() {
    const { user } = this.props;

    return (
      <Height>
        <BottomNavigation>
          <TopNavigation edit_icon>
            <Container color={theme.palette.canvasColor}>

              <ProfileHeader user={user} />

              <ProfileInformation user={user} />

              <SocialMediaAccounts user={user} />

              <Margin>
                <Button
                  accent
                  icon='stars'
                  text='Try Premium Account'
                  onPress={() => {console.log('try a premium account!');}} />
              </Margin>

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

const ProfileContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
`

const Margin = styled.View`
  margin: 20px 20px 20px 20px;
`

const mapStateToProps = ({ user }) => {
  return { user };
}

export default connect(mapStateToProps)(Profile);
