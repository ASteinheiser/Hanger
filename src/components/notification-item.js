import React          from 'react';
import { Text, View } from 'react-native';
import { Avatar }     from 'react-native-material-ui';
import styled         from 'styled-components/native';

import theme from '../theme.js';

export default class NotificationItem extends React.Component {
  render() {
    return (
      <Container color={theme.palette.disabledColor}>

        <Avatar icon='person' iconColor='gray' size={40} iconSize={30} />

        <BodyText color={theme.palette.primaryTextColor}>
          <ColoredText color={theme.palette.secondaryTextColor}>
            { this.props.username + ' ' }
          </ColoredText>
          { this.props.text }
          <ColoredText color={theme.palette.disabledColor}>
            { '  |  ' + this.props.timestamp }
          </ColoredText>
        </BodyText>

      </Container>
    )
  }
}

const BodyText = styled.Text`
  font-size: 14px;
  color: ${props => props.color};

  padding-top: 10px;
`

const ColoredText = styled.Text`
  color: ${props => props.color};
`

const Container = styled.View`
  flex: 1;
  flex-direction: row;

  padding: 15px;
  border-color: ${props => props.color};
  border-bottom-width: 1px;
`
