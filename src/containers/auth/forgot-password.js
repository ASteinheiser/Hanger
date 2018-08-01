import React                from 'react';
import { Auth }             from 'aws-amplify';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import TopNavigation     from '../../components/top-navigation.js';
import theme             from '../../theme.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', valid: true },
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

  handleSubmit() {
    const formObject = { email: this.state.email };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true }, () => {
        this.clearAlert();

        const email = this.state.email.value.toLowerCase();

        Auth.forgotPassword(email)
         .then(response => {
           this.setState({ loading: false });
           this.props.history.push({
             pathname: '/new-password',
             state: { email }
           });
         })
         .catch(err => {
           console.log(err);
           this.setState({ alertMessage: err.message, loading: false });
         });
     });
    } else {
      emptyFields.forEach(fieldName => {
        this.setState({[fieldName]: {value: '', valid: false}});
      });
    }
  }

  clearAlert() {
    this.setState({ alertMessage: '' });
  }

  render() {
    return (
      <Height>
        <TopNavigation
          back-button
          route='/'
          history={this.props.history} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Reset Password' />

          <Alert message={this.state.alertMessage} />

          <Input
            keyboardType={'email-address'}
            onChange={this.onChange.bind(this, 'email')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            value={this.state.email.value}
            error={!this.state.email.valid ? 'Enter a valid email.' : ''}
            />

          <Margin>
            <Button
              primary
              disabled={this.state.loading}
              icon="subdirectory-arrow-right"
              text="Reset Password"
              onPress={this.handleSubmit.bind(this)} />
          </Margin>
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

const Margin = styled.View`
  margin: 30px 20px 20px 20px;
`
