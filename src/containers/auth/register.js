import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import HeaderText         from '../../components/header-text.js';
import Button             from '../../components/button.js';
import Input              from '../../components/input.js';
import TopNavigationBasic from '../../components/top-navigation-basic.js';
import theme              from '../../theme.js';

export default class Register extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic
          back-button
          route='Login'
          navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Register' />

          <Input
            // onChange
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Username'}
            // value
            />
          <Input
            secureTextEntry={true}
            // onChange
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Full Name'}
            // value
            />
          <Input
            keyboardType={'email-address'}
            // onChange
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            // value
            />
          <Input
            secureTextEntry={true}
            // onChange
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Password'}
            // value
            />
          <Input
            secureTextEntry={true}
            // onChange
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Confirm Password'}
            // value
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Register"
              onPress={() => this.props.navigation.navigate('Home')} />
          </TopMargin>
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

const TopMargin = styled.View`
  margin: 30px 20px 0 20px;
`
