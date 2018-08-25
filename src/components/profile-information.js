import React  from 'react';
import styled from 'styled-components/native';

import theme from '../theme.js';

export default class ProfileInformation extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <ProfileInfoView>
        <InfoRowView color={theme.palette.disabledColor}>
          <InfoText color={theme.palette.primaryTextColor}>
            {'Hanger Level'}
          </InfoText>
          <InfoText color={theme.palette.primaryTextColor}>
            {
              user && user.hanger_level ?
                user.hanger_level
                :
                '-'
            }
          </InfoText>
        </InfoRowView>
        <InfoRowView color={theme.palette.disabledColor}>
          <InfoText color={theme.palette.primaryTextColor}>
            {'Username'}
          </InfoText>
          <InfoText color={theme.palette.primaryTextColor}>
            {
              user && user.display_name ?
                user.display_name
                :
                '-'
            }
          </InfoText>
        </InfoRowView>
        <InfoRowView color={theme.palette.disabledColor}>
          <InfoText color={theme.palette.primaryTextColor}>
            {'Job'}
          </InfoText>
          <InfoText color={theme.palette.primaryTextColor}>
            {
              user && user.job ?
                user.job
                :
                '-'
            }
          </InfoText>
        </InfoRowView>
        <InfoRowView color={theme.palette.disabledColor}>
          <InfoText color={theme.palette.primaryTextColor}>
            {'Website'}
          </InfoText>
          <InfoText color={theme.palette.primaryTextColor}>
            {
              user && user.website ?
                user.website
                :
                '-'
            }
          </InfoText>
        </InfoRowView>
        <InfoRowView no_border color={theme.palette.disabledColor}>
          <InfoText color={theme.palette.primaryTextColor}>
            {'Bio'}
          </InfoText>
          <InfoText color={theme.palette.primaryTextColor}>
            {
              user && user.bio ?
                user.bio
                :
                '-'
            }
          </InfoText>
        </InfoRowView>
      </ProfileInfoView>
    )
  }
}

const ProfileInfoView = styled.View`
  flex: 1;
  flex-direction: column;

  padding: 0 15px 0 15px;
`

const InfoText = styled.Text`
  color: ${props => props.color};
  font-size: 16px;
  text-align: center;
`

const InfoRowView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  padding: 15px 10px 15px 10px;

  border-bottom-width: ${props => props.no_border ? '0px' : '1px'};
  border-bottom-color: ${props => props.color};
`
