import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import IconWithText       from '../components/icon-with-text.js';
import TopNavigationBasic from '../components/top-navigation-basic.js';
import theme              from '../theme.js';

export default class Settings extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic />

        <Container color={theme.palette.canvasColor}>
          <IconWithText
            icon='settings'
            text='Settings Page' />
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
