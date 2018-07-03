import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components';

import HeaderText         from '../../components/header-text.js';
import Button             from '../../components/button.js';
import Input              from '../../components/input.js';
import TopNavigationBasic from '../../components/top-navigation-basic.js';
import theme              from '../../theme.js';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  onChange(e) {
    this.setState({ email: e });
  }

  handleLogin() {
    console.log(this.state);
    this.props.navigation.navigate('Login');
  }

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
            onChange={this.onChange.bind(this)}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            value={this.state.email}
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Reset Password"
              onPress={this.handleLogin.bind(this)} />
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
