import React        from 'react';
import styled       from 'styled-components';
import { Toolbar }  from 'react-native-material-ui';
import SplashScreen from 'react-native-splash-screen';
import Image        from 'react-native-scalable-image';
import { View, Text, ScrollView } from 'react-native';

import theme from '../theme.js';
import logo  from '../../assets/hanger-black.png';

export default class Home extends React.Component {

  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1000);
  }

  render() {
    return (
      <Flex>
        <Toolbar centerElement={
          <Centered>
            <Image source={logo} height={40} />
          </Centered>
        } />

        <Container color={theme.palette.canvasColor}>
          <Text>{'Welcome to the home...'}</Text>
        </Container>
      </Flex>
    )
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`

const Centered = styled.View`
  padding-right: 20px;
  margin: 0 auto;
`
