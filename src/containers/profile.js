import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation        from '../components/bottom-navigation.js';
import ProfileHeader           from '../components/profile-header.js';
import ProfileContentThumbnail from '../components/profile-content-thumbnail.js';
import TopNavigation           from '../components/top-navigation.js';

import SAMPLE_CONTENT from '../../assets/data/user-content.json';
import SAMPLE_USER    from '../../assets/data/user.json';
import theme          from '../theme.js';

export default class Profile extends React.Component {
  render() {
    const ProfileContent = _map(SAMPLE_CONTENT, content =>
      <ProfileContentThumbnail
        key={content.id}
        link={content.link} />
    );

    return (
      <Height>

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <TopNavigation title='Profile' navigation={this.props.navigation}>
            <Container color={theme.palette.canvasColor}>

              <ProfileHeader user={SAMPLE_USER}/>

              <ProfileContentContainer>
                { ProfileContent }
              </ProfileContentContainer>

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
  flex-wrap: wrap;
  flex-direction: row;

  justify-content: space-between;
`
