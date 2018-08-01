import React          from 'react';
import { View, Text } from 'react-native';
import { Icon }       from 'react-native-material-ui';
import styled         from 'styled-components/native';

export default class IconWithText extends React.Component {
  render() {
    return (
      <Centered>
        <FlexRow>
          <MarginRight>
            <Icon name={ this.props.icon } />
          </MarginRight>
          <StyledText>
            { this.props.text }
          </StyledText>
        </FlexRow>
      </Centered>
    )
  }
}

const Centered = styled.View`
  margin: 20px auto;
`

const StyledText = styled.Text`
  font-size: 20px;
`

const FlexRow = styled.View`
  flex: 1;
  flex-direction: row;
`

const MarginRight = styled.View`
  margin-right: 10px;
`
