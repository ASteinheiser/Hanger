import React                from 'react';
import { Auth }             from 'aws-amplify';
import styled               from 'styled-components/native';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import Divider           from '../../components/divider.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import TopNavigation     from '../../components/top-navigation.js';
import theme             from '../../theme.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:    { value: '', valid: true },
      password: { value: '', valid: true },
      alertMessage: '',
      loading: false
    };
  }

  onChange(field, e) {
    if(e.nativeEvent) {
      let { value, valid } = validateField(field, e.nativeEvent.text, this.state);

      this.setState({
        [field]: { value, valid }
      });
    }
  }

  handleLogin() {
    const formObject = { email: this.state.email, password: this.state.password };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true}, () => {
        this.closeAlert();

        Auth.signIn(this.state.email.value.toLowerCase(), this.state.password.value)
          .then(response => {
            this.setState({ loading: false });
            this.handleNavigation('/home');
          })
          .catch(err => {
            this.setState({ alertMessage: err.message, loading: false });
          });
      });
    } else {
      emptyFields.forEach(fieldName => {
        this.setState({[fieldName]: {value: '', valid: false}});
      });
    }
  }

  closeAlert() {
    this.setState({ alertMessage: '' });
  }

  handleNavigation(route) {
    this.setState({
      email:    { value: '', valid: true },
      password: { value: '', valid: true },
      alertMessage: '',
      loading: false
    });
    this.props.history.push(route);
  }

  handleViewPublicFeed() {
    this.props.setuser('viewPublicFeed');
    this.props.history.push('/home');
  }

  render() {
    return (
      <Flex>
        <TopNavigation no-buttons />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Login' />

          <Alert message={this.state.alertMessage} />

          <Input
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            keyboardType={'email-address'}
            onChange={this.onChange.bind(this, 'email')}
            label={'Email Address'}
            value={this.state.email.value}
            error={!this.state.email.valid ? 'Enter a valid email.' : ''}
            />
          <Input
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'password')}
            label={'Password'}
            value={this.state.password.value}
            error={!this.state.password.valid ? 'Enter a valid password.' : ''}
            />

          <TopMargin>
            <Button
              primary
              disabled={this.state.loading}
              icon="subdirectory-arrow-right"
              text="Login"
              onPress={this.handleLogin.bind(this)} />
          </TopMargin>

          <Divider />

          <Margin>
            <Button
              accent
              icon="supervisor-account"
              text="Public Feed"
              onPress={this.handleViewPublicFeed.bind(this)} />
          </Margin>

          <Margin>
            <Button
              accent
              icon="assignment"
              text="Register"
              onPress={this.handleNavigation.bind(this, '/register')} />
          </Margin>
          <Margin>
            <Button
              accent
              icon="help-outline"
              text="Forgot Password"
              onPress={this.handleNavigation.bind(this, '/forgot-password')} />
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
  margin: 20px 20px 20px 20px;
`

const TopMargin = styled.View`
  margin: 30px 20px 0 20px;
`
