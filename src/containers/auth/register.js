import React                from 'react';
import { Auth }             from 'aws-amplify';
import styled               from 'styled-components/native';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import TopNavigation     from '../../components/top-navigation.js';
import theme             from '../../theme.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';
import { uuidv4 }        from '../../functions/uuid-v4.js';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:         { value: '', valid: true },
      password:      { value: '', valid: true },
      passwordMatch: { value: '', valid: true },
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
    const formObject = {
      email: this.state.email,
      password: this.state.password,
      passwordMatch: this.state.passwordMatch
    };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true }, () => {
        this.clearAlert();

        let username = uuidv4();

        let params = {
          username: username,
          password: this.state.password.value,
          attributes: {
            email: this.state.email.value.toLowerCase()
          }
        };

        Auth.signUp(params)
          .then((response) => {
            this.setState({ loading: false });
            this.props.history.replace('/check-email');
          })
          .catch((err) => {
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
    this.setState({ alert: '' });
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

          <Alert message={this.state.alertMessage} />

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
            error={!this.state.password.valid ? 'Must be longer than 12 and contain: number, lowercase, uppercase' : ''}
            />
          <Input
            secureTextEntry={true}
            onChange={this.onChange.bind(this, 'passwordMatch')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Confirm Password'}
            value={this.state.passwordMatch.value}
            error={!this.state.passwordMatch.valid ? 'Passwords do not match.' : ''}
            />

          <Margin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Register"
              disabled={this.state.loading}
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
