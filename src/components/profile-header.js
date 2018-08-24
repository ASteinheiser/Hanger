import React          from 'react';
import { Text, View } from 'react-native';
import { Avatar }     from 'react-native-material-ui';
import styled         from 'styled-components/native';

import Button from './button.js';

import theme from '../theme.js';

export default class ProfileHeader extends React.Component {
  render() {
    return (
      <Container color={theme.palette.disabledColor}>
        <ProfileContainer>
          <Avatar icon='person' iconColor='gray' size={80} iconSize={60} />
        </ProfileContainer>

        <FlexRow>
          <UsernameText color={theme.palette.secondaryTextColor}>
            {
              this.props.user && this.props.user.first_name && this.props.user.last_name ?
                this.props.user.first_name + ' ' + this.props.user.last_name
                :
                null
            }
          </UsernameText>

          <Button
            small
            accent
            text="Follow"
            onPress={()=> { console.log('followed user!') }} />
        </FlexRow>

        <HeaderText color={theme.palette.disabledColor}>
          {
            this.props.user && this.props.user.location ?
              'From ' + this.props.user.location
              :
              null
          }
        </HeaderText>

        <BodyText color={theme.palette.primaryTextColor}>
          {
            this.props.user && this.props.user.description ?
              this.props.user.description
              :
              null
          }
        </BodyText>
      </Container>
    )
  }
}

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

const UsernameText = styled.Text`
  font-size: 16px;
  color: ${props => props.color};

  padding: 0 5px 0 5px;
`

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

const FlexRow = styled.View`
  flex-direction: row;
  justify-content: center;
`
