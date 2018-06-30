import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import ProfileHeader      from '../components/profile-header.js';
import IconWithText       from '../components/icon-with-text.js';
import TopNavigationBasic from '../components/top-navigation-basic.js';
import theme              from '../theme.js';

import SAMPLE_USER from '../../assets/user.json';

export default class Profile extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>
          <ProfileHeader user={SAMPLE_USER}/>

          <IconWithText
            icon='person'
            text='Profile content goes here :)' />
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
