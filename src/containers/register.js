import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import IconWithText       from '../components/icon-with-text.js';
import TopNavigationBasic from '../components/top-navigation-basic.js';
import theme              from '../theme.js';

export default class Register extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic
          back-button
          route='Login'
          navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>
          <IconWithText
            icon='assignment'
            text='Register PAGE!!' />
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
