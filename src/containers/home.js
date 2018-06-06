import React          from 'react';
import { View, Text } from 'react-native';
import styled         from 'styled-components/native';
import SplashScreen   from 'react-native-splash-screen';

export default class Home extends React.Component {

  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1000);
  }

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
