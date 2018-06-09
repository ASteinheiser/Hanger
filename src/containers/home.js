import React                from 'react';
import { View, ScrollView } from 'react-native';
import SplashScreen         from 'react-native-splash-screen';
import styled               from 'styled-components';

import IconWithText       from '../components/icon-with-text.js';
import TopNavigationBasic from '../components/top-navigation-basic.js';
import theme              from '../theme.js';

export default class Home extends React.Component {

  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1000);
  }

  render() {
    return (
      <Flex>
        <TopNavigationBasic />

        <Container color={theme.palette.canvasColor}>
          <IconWithText
            icon='home'
            text='Welcome to the Home!' />
        </Container>
      </Flex>
    );
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`
