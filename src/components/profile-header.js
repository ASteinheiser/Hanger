import React          from 'react';
import { Text, View } from 'react-native';
import { Avatar }     from 'react-native-material-ui';
import styled         from 'styled-components';

import theme from '../theme.js';

export default class ProfileHeader extends React.Component {
  render() {
    return (
      <Container color={theme.palette.disabledColor}>
        <ProfileContainer>
          <Avatar icon='person' iconColor='gray' size={80} iconSize={60} />
        </ProfileContainer>

        <HeaderText color={theme.palette.secondaryTextColor}>
          { this.props.user.username }
        </HeaderText>

        <HeaderText color={theme.palette.disabledColor}>
          { this.props.user.category }
        </HeaderText>

        <BodyText color={theme.palette.primaryTextColor}>
          { this.props.user.description }
        </BodyText>
      </Container>
    )
  }
}

const HeaderText = styled.Text`
  font-size: 16px;
  color: ${props => props.color};

  padding-bottom: 5px;
  text-align: center;
`

const BodyText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${props => props.color};
`

const Container = styled.View`
  flex: 1;
  flex-direction: column;

  padding: 15px;
  border-color: ${props => props.color};
  border-bottom-width: 1px;
`

const ProfileContainer = styled.View`
  margin: 0 auto;
  padding-bottom: 10px;
`
