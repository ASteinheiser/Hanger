import React, { Component } from 'react';
import { View }             from 'react-native';
import styled               from 'styled-components/native';

import theme from '../theme.js';

export default class HeaderText extends Component {
  render() {
    let fontSize = '36px';
    if(this.props.small) {
      fontSize = '28px';
    }
    let color = 'white';
    if(this.props.blue) {
      color = theme.palette.primaryColor;
    }
    return (
      <View>
        <StyledText size={fontSize} color={color}>
          { this.props.text }
        </StyledText>
        {
          this.props.body ?
            <BodyText>
              { this.props.body }
            </BodyText>
            :
            <View></View>
        }
      </View>
    )
  }
}

const StyledText = styled.Text`
  font-size: ${props => props.size};
  color: ${props => props.color};

  text-align: center;
  padding: 15px 5% 0 5%;
`

const BodyText = styled.Text`
  font-size: 16px;
  color: white;

  text-align: center;
  padding: 15px 10% 15px 10%;
`
