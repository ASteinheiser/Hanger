import React          from 'react';
import { Text, View } from 'react-native';
import { Avatar }     from 'react-native-material-ui';
import styled         from 'styled-components/native';

import theme from '../theme.js';

export default class MessageItem extends React.Component {
  render() {
    return (
      <Touchable onPress={this.props.onPress.bind(this)}>
        <Container color={theme.palette.disabledColor}>

          <ImageContainer>
            <Avatar icon='person' iconColor='gray' size={40} iconSize={30} />
          </ImageContainer>

          <ColoredText color={theme.palette.primaryColor}>
            { this.props.text }
          </ColoredText>

        </Container>
      </Touchable>
    )
  }
}

const Touchable = styled.TouchableOpacity`
  z-index: 1000;
`

const ColoredText = styled.Text`
  font-size: 14px;
  color: ${props => props.color};
  padding: 3px 0 0 7px;
`

const Container = styled.View`
  flex: 1;
  flex-direction: row;

  padding: 15px;
`

const ImageContainer = styled.View`
  flex-basis: 50px;
  justify-content: center;
`
