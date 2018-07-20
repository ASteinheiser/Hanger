import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';

import HeaderText    from '../../components/header-text.js';
import Button        from '../../components/button.js';
import Divider       from '../../components/divider.js';
import Input         from '../../components/input.js';
import TopNavigation from '../../components/top-navigation.js';
import theme         from '../../theme.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onChange(field, e) {
    this.setState({ [`${field}`]: e });
  }

  handleLogin() {
    console.log(this.state);
    this.props.history.replace('/home');
  }

  render() {
    return (
      <Flex>
        <TopNavigation no-buttons />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Login' />

          <Input
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            keyboardType={'email-address'}
            onChange={this.onChange.bind(this, 'email')}
            label={'Email Address'}
            value={this.state.email}
            />
          <Input
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'password')}
            label={'Password'}
            value={this.state.password}
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Login"
              onPress={this.handleLogin.bind(this)} />
          </TopMargin>

          <Divider />

          <Margin>
            <Button
              accent
              icon="assignment"
              text="Register"
              onPress={()=> { this.props.history.push('/register') }} />
          </Margin>
          <Margin>
            <Button
              accent
              icon="help-outline"
              text="Forgot Password"
              onPress={()=> { this.props.history.push('/forgot-password') }} />
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
