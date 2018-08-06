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

export default class NewPassword extends React.Component {
  constructor(props) {
    super(props);

    let email = '';
    if(props.location && props.location.state && props.location.state.email) {
      email = props.location.state.email;
    }

    this.state = {
      email: email,
      code:          { value: '', valid: true },
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
      code: this.state.code,
      password: this.state.password,
      passwordMatch: this.state.passwordMatch
    };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true }, () => {
        this.clearAlert();

        Auth.forgotPasswordSubmit(this.state.email, this.state.code.value, this.state.password.value)
          .then(response => {
            this.setState({ loading: false });
            this.props.history.push('/');
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

          <HeaderText text='New Password' />

          <Subheader color={theme.palette.primaryTextColor}>
            {'Check your email for a reset code'}
          </Subheader>

          <Alert message={this.state.alertMessage} />

          <Input
            keyboardType={'numeric'}
            onChange={this.onChange.bind(this, 'code')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Code'}
            value={this.state.code.value}
            error={!this.state.code.valid ? 'Enter a valid code.' : ''}
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

          <Margin>
            <Button
              primary
              disabled={this.state.loading}
              icon="subdirectory-arrow-right"
              text="Set New Password"
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

const Subheader = styled.Text`
  font-size: 20px;
  color: ${props => props.color};

  text-align: center;
  padding-bottom: 10px;
`

const Margin = styled.View`
  margin: 30px 20px 20px 20px;
`
