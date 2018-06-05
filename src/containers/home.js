import React          from 'react';
import { View, Text } from 'react-native';
import styled         from 'styled-components/native';

export default class Home extends React.Component {
  render() {
    return (
      <Flex>
        <Text>{'Welcome to the home...'}</Text>
      </Flex>
    )
  }
}

const Flex = styled.View`
  flex: 1;
`
