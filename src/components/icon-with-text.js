import React          from 'react';
import { View, Text } from 'react-native';
import { Icon }       from 'react-native-material-ui';
import styled         from 'styled-components';

export default class IconWithText extends React.Component {
  render() {
    return (
      <Margin>
        <FlexRow>
          <MarginRight>
            <Icon name={ this.props.icon } />
          </MarginRight>
          <StyledText>
            { this.props.text }
          </StyledText>
        </FlexRow>
      </Margin>
    )
  }
}

const Margin = styled.View`
  margin: 25px 20px;
`

const StyledText = styled.Text`
  font-size: 16px;
`

const FlexRow = styled.View`
  flex: 1;
  flex-direction: row;
`

const MarginRight = styled.View`
  margin-right: 10px;
`
