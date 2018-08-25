import React      from 'react';
import { Avatar } from 'react-native-material-ui';
import styled     from 'styled-components/native';

import theme from '../theme.js';

export default class ProfileHeader extends React.Component {
  render() {
    return (
      <ProfileView color={theme.palette.disabledColor}>
        <ProfileImageView>
          <Avatar icon='person' iconColor='gray' size={100} iconSize={80} />
        </ProfileImageView>

        <FullNameText color={theme.palette.secondaryTextColor}>
          {
            this.props.user && this.props.user.first_name && this.props.user.last_name ?
              this.props.user.first_name + ' ' + this.props.user.last_name
              :
              ''
          }
        </FullNameText>

        <LocationText color={theme.palette.disabledColor}>
          {
            this.props.user && this.props.user.location ?
              'From ' + this.props.user.location
              :
              ''
          }
        </LocationText>

        <HangerStatsView color={theme.palette.primaryColor}>
          <ConnectionsText>
            {'Connections'}
          </ConnectionsText>
          <ProjectsText color={theme.palette.primaryColor}>
            {'Projects'}
          </ProjectsText>
          <PointsEarnedText>
            {'Points Earned'}
          </PointsEarnedText>
        </HangerStatsView>
      </ProfileView>
    )
  }
}

const ProfileView = styled.View`
  flex: 1;
  flex-direction: column;

  padding: 15px;
`

const ProfileImageView = styled.View`
  margin: 0 auto;
  padding-bottom: 15px;
`

const FullNameText = styled.Text`
  font-size: 22px;
  color: ${props => props.color};

  padding: 0 5px 5px 5px;
  text-align: center;
`

const LocationText = styled.Text`
  font-size: 16px;
  color: ${props => props.color};

  padding-bottom: 5px;
  text-align: center;
`

const HangerStatsView = styled.View`
  border-top-color: ${props => props.color};
  border-top-width: 3px;
  border-bottom-color: ${props => props.color};
  border-bottom-width: 3px;

  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const PointsEarnedText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: black;
`

const ProjectsText = styled.Text`
  border-left-color: ${props => props.color};
  border-left-width: 3px;
  border-right-color: ${props => props.color};
  border-right-width: 3px;

  font-size: 14px;
  text-align: center;
  color: black;
`

const ConnectionsText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: black;
`
