import React  from 'react';
import styled from 'styled-components/native';
import _map   from 'lodash.map';

import Button             from '../components/button.js'
import BottomNavigation   from '../components/bottom-navigation.js';
import ProfileHeader      from '../components/profile-header.js';
import ProfileInformation from '../components/profile-information.js';
import TopNavigation      from '../components/top-navigation.js';

import theme from '../theme.js';

export default class Profile extends React.Component {
  render() {
    let user = this.props.user;
    if(typeof user === 'string') user = JSON.parse(user);

    return (
      <Height>

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <TopNavigation edit_icon navigation={this.props.navigation}>
            <Container color={theme.palette.canvasColor}>

              <ProfileHeader user={user} history={this.props.history}/>

              <ProfileInformation user={user} history={this.props.history}/>

              <Margin>
                <Button
                  accent
                  text="Try Premium Account"
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
