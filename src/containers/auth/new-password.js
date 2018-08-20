import React                from 'react';
import { Auth }             from 'aws-amplify';
import styled               from 'styled-components/native';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

import HangerLogo     from '../../../assets/icons/hanger-white.png';
import Photographer   from '../../../assets/splash-screens/registration/photographer.jpeg';

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
      <Flex>
        <BackgroundImage source={Photographer} />
        <BackgroundFilter />

        <Container>
          <TopPadding>
            <FullWidth>
              <HangerImage small source={HangerLogo} />
            </FullWidth>
          </TopPadding>

          <HeaderText small
            text='New Password'
            body='Please check your email for your reset code.' />

          <Alert message={this.state.alertMessage} />

          <InputMargin>
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
          </InputMargin>

          <TopMargin>
            <Button
              primary
              disabled={this.state.loading}
              icon="subdirectory-arrow-right"
              text="Set New Password"
              onPress={this.handleSubmit.bind(this)} />
          </TopMargin>

          <Margin>
            <Button
              primary
              icon="arrow-back"
              text="Go Back"
              onPress={() => this.props.history.replace('/')} />
          </Margin>
        </Container>
      </Flex>
    )
  }
}

const Flex = styled.View`
  height: 100%;
`

const Container = styled.ScrollView`
  flex: 1;

  z-index: 3;
`

const Margin = styled.View`
  margin: 20px 20% 20px 20%;
`

const TopMargin = styled.View`
  margin: 30px 20% 20px 20%;
`

const HangerImage = styled.Image`
  width: ${props => props.small ? '100px' : '150px'};
  height: ${props => props.small ? '100px' : '150px'};

  margin: 0 auto;
`

const BackgroundImage = styled.Image`
  position: absolute;

  height: 100%;
  width: 100%;

  z-index: 1;
`

const BackgroundFilter = styled.View`
  position: absolute;

  height: 100%;
  width: 100%;

  background: rgba(0, 0, 0, 0.5);

  z-index: 2;
`

const FullWidth = styled.View`
  width: 100%;
`

const InputMargin = styled.View`
  margin: 0 5%;
`

const TopPadding = styled.View`
  padding-top: 25px;
`
