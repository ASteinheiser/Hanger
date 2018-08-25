import React      from 'react';
import { Avatar } from 'react-native-material-ui';
import styled     from 'styled-components/native';

import theme from '../theme.js';

export default class ProfileHeader extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <ProfileView color={theme.palette.disabledColor}>
        <ProfileImageView>
          <Avatar icon='person' iconColor='gray' size={120} iconSize={100} />
        </ProfileImageView>

        <FullNameText color={theme.palette.secondaryTextColor}>
          {
            user && user.first_name && user.last_name ?
              user.first_name + ' ' + user.last_name
              :
              ''
          }
        </FullNameText>

        <HangerStatsView color={theme.palette.primaryColor}>
          <StatsColumnView>
            <StatsText color={theme.palette.primaryTextColor}>
              {'Connections'}
            </StatsText>
            <StatsValueText color={theme.palette.primaryColor}>
              {
                user && user.connections ?
                  user.connections
                  :
                  '-'
              }
            </StatsValueText>
          </StatsColumnView>
          <StatsColumnView border color={theme.palette.primaryColor}>
            <StatsText color={theme.palette.primaryTextColor}>
              {'Projects'}
            </StatsText>
            <StatsValueText color={theme.palette.primaryColor}>
              {
                user && user.projects ?
                  user.projects
                  :
                  '-'
              }
            </StatsValueText>
          </StatsColumnView>
          <StatsColumnView>
            <StatsText color={theme.palette.primaryTextColor}>
              {'Points Earned'}
            </StatsText>
            <StatsValueText color={theme.palette.primaryColor}>
              {
                user && user.total_points ?
                  user.total_points
                  :
                  '-'
              }
            </StatsValueText>
          </StatsColumnView>
        </HangerStatsView>
      </ProfileView>
    )
  }
}

const ProfileView = styled.View`
  flex: 1;
  flex-direction: column;

  padding: 15px 15px 0 15px;
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

const HangerStatsView = styled.View`
  border-top-color: ${props => props.color};
  border-top-width: 3px;
  border-bottom-color: ${props => props.color};
  border-bottom-width: 3px;

  margin-top: 10px;
  margin-bottom: 10px;

  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

const StatsText = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
  text-align: center;

  padding-bottom: 10px;
`

const StatsValueText = styled.Text`
  color: ${props => props.color};
  font-size: 22px;
  text-align: center;
`

const StatsColumnView = styled.View`
  border-left-color: ${props => props.color ? props.color : '#eee'};
  border-left-width: ${props => props.border ? '3px' : '0px'};
  border-right-color: ${props => props.color ? props.color : '#eee'};
  border-right-width: ${props => props.border ? '3px' : '0px'};

  flex: 1;
  flex-direction: column;
  justify-content: center;

  padding-top: 20px;
  padding-bottom: 20px;
`
