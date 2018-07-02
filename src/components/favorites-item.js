import React                 from 'react';
import { Text, View, Image } from 'react-native';
import styled                from 'styled-components';

import theme from '../theme.js';

export default class FavoritesItem extends React.Component {
  render() {
    return (
      <Container color={theme.palette.disabledColor}>

        <StyledImage source={{ uri: this.props.image }} alt='favorites_item' />

        <StyledText color={theme.palette.primaryTextColor}>
          { this.props.title }
        </StyledText>

      </Container>
    )
  }
}


const Container = styled.View`
  flex: 1;
  flex-direction: row;

  padding: 15px;
  border-color: ${props => props.color};
  border-bottom-width: 1px;
`

const StyledText = styled.Text`
  font-size: 14px;
  color: ${props => props.color};

  padding: 10px 0 0 10px;
`

const StyledImage = styled.Image`
  height: 75px;
  width: 75px;
`
