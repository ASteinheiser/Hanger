import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';

import HeaderText    from '../../components/header-text.js';
import Button        from '../../components/button.js';
import Input         from '../../components/input.js';
import TopNavigation from '../../components/top-navigation.js';
import theme         from '../../theme.js';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      fullName: '',
      emailAddress: '',
      password: '',
      confirmPassword: ''
    };
  }

  onChange(field, e) {
    this.setState({ [`${field}`]: e });
  }

  handleSubmit() {
    console.log(this.state);
    this.props.history.push('/home');
  }

  render() {
    return (
      <Height>
        <TopNavigation
          back-button
          route='/'
          history={this.props.history} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Register' />

          <Input
            onChange={this.onChange.bind(this, 'userName')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Username'}
            value={this.state.userName}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'fullName')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Full Name'}
            value={this.state.fullName}
            />
          <Input
            keyboardType={'email-address'}
            onChange={this.onChange.bind(this, 'emailAddress')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            value={this.state.emailAddress}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'password')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Password'}
            value={this.state.password}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'confirmPassword')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Confirm Password'}
            value={this.state.confirmPassword}
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Register"
              onPress={this.handleSubmit.bind(this)} />
          </TopMargin>
        </Container>
      </Height>
    )
  }
}

const Height = styled.View`
  height: 100%;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`

const TopMargin = styled.View`
  margin: 30px 20px 0 20px;
`
