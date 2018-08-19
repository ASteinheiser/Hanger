import React, { Component } from 'react';
import { View }             from 'react-native';
import styled               from 'styled-components/native';

export default class HeaderText extends Component {
  render() {
    let fontSize = '36px';
    if(this.props.small) {
      fontSize = '28px';
    }
    return (
      <View>
        <StyledText size={fontSize}>
          { this.props.text }
        </StyledText>
        {
          this.props.body ?
            <BodyText>
              { this.props.body }
            </BodyText>
            :
            ''
        }
      </View>
    )
  }
}

const StyledText = styled.Text`
  font-size: ${props => props.size};
  color: white;

  text-align: center;
  padding: 15px 5% 0 5%;
`

const BodyText = styled.Text`
  font-size: 16px;
  color: white;

  text-align: center;
  padding: 15px 10% 15px 10%;
`
