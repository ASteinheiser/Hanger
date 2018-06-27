import React                 from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Icon }        from 'react-native-material-ui';
import styled                from 'styled-components';

import theme from '../theme.js';

export default class IconWithText extends React.Component {
  render() {
    return (
      <Margin>
        <Card>

          <StyledImage source={{ uri: this.props.image }} alt='feed_post' />

          <StyledText color={theme.palette.primaryTextColor}>
            { this.props.title }
          </StyledText>

        </Card>
      </Margin>
    )
  }
}

const Margin = styled.View`
  margin: 15px 15px 0 15px;
`

const StyledText = styled.Text`
  font-size: 20px;
  color: ${props => props.color};

  margin: 15px;
  padding-top: 15px;

  border-top-color: ${props => props.color};
  border-top-width: 1px;
`

const StyledImage = styled.Image`
  height: 400px;
  width: 100%;
`
