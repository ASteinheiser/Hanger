import React                from 'react';
import { Auth }             from 'aws-amplify';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';

import HeaderText        from '../../components/header-text.js';
import Button            from '../../components/button.js';
import Input             from '../../components/input.js';
import TopNavigation     from '../../components/top-navigation.js';
import theme             from '../../theme.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:      { value: '', valid: true },
      fullName:      { value: '', valid: true },
      email:         { value: '', valid: true },
      password:      { value: '', valid: true },
      passwordMatch: { value: '', valid: true },
      snackbarMessage: ''
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

  handleSubmit() {
    const formObject = {
      userName: this.state.userName,
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      passwordMatch: this.state.passwordMatch
    };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.props.history.replace('/home');

      // let params = {
      //   username: username,
      //   password: this.state.password.value,
      //   attributes: {
      //     given_name: this.state.firstName.value,
      //     family_name: this.state.lastName.value,
      //     email: this.state.email.value.toLowerCase()
      //   }
      // };
      //
      // Auth.signUp(params)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch(() => {
      //     console.log(err);
      //     this.setState({ snackbarMessage: err.message });
      //   });
    } else {
      emptyFields.forEach(fieldName => {
        this.setState({[fieldName]: {value: '', valid: false}});
      });
    }
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
            value={this.state.userName.value}
            error={!this.state.userName.valid ? 'Enter a username.' : ''}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'fullName')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Full Name'}
            value={this.state.fullName.value}
            error={!this.state.fullName.valid ? 'Enter your name.' : ''}
            />
          <Input
            keyboardType={'email-address'}
            onChange={this.onChange.bind(this, 'email')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            value={this.state.email.value}
            error={!this.state.email.valid ? 'Enter a valid email.' : ''}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'password')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Password'}
            value={this.state.password.value}
            error={!this.state.password.valid ? 'Enter a valid password.' : ''}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'passwordMatch')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Confirm Password'}
            value={this.state.passwordMatch.value}
            error={!this.state.passwordMatch.valid ? 'Passwords do not match.' : ''}
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
