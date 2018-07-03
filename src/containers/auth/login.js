import React                 from 'react';
import { View, ScrollView }  from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled                from 'styled-components';

import HeaderText         from '../../components/header-text.js';
import Button             from '../../components/button.js';
import Divider            from '../../components/divider.js';
import Input              from '../../components/input.js';
import TopNavigationBasic from '../../components/top-navigation-basic.js';
import theme              from '../../theme.js';

export default class Login extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic no-buttons />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Sign in' />

          <Input
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            keyboardType={'email-address'}
            // onChange
            label={'Email Address'}
            // value
            />
          <Input
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            secureTextEntry={true}
            // onChange
            label={'Password'}
            // value
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Login"
              onPress={() => this.props.navigation.navigate('Home')} />
          </TopMargin>

          <Divider />

          <Margin>
            <Button
              accent
              icon="assignment"
              text="Register"
              onPress={()=> { this.props.navigation.replace('Register') }} />
          </Margin>
          <Margin>
            <Button
              accent
              icon="help-outline"
              text="Forgot Password"
              onPress={()=> { this.props.navigation.replace('ForgotPassword') }} />
          </Margin>
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

const Margin = styled.View`
  margin: 20px 20px 0 20px;
`

const TopMargin = styled.View`
  margin: 30px 20px 0 20px;
`
