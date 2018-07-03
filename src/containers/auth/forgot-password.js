import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import HeaderText         from '../../components/header-text.js';
import Button             from '../../components/button.js';
import Input              from '../../components/input.js';
import TopNavigationBasic from '../../components/top-navigation-basic.js';
import theme              from '../../theme.js';

export default class ForgotPassword extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic
          back-button
          route='Login'
          navigation={this.props.navigation} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Reset Password' />

          <Input
            keyboardType={'email-address'}
            // onChange
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            // value
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Reset Password"
              onPress={() => this.props.navigation.replace('Login')} />
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
