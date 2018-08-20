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

import HangerLogo     from '../../../assets/icons/hanger-white.png';
import Photographer   from '../../../assets/splash-screens/registration/photographer.jpeg';

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
            text='Register New Account'
            body='Be a part of the Hanger Community!' />

          <Alert message={this.state.alertMessage} />

          <InputMargin>
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
          </InputMargin>

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Register"
              disabled={this.state.loading}
              onPress={this.handleSubmit.bind(this)} />
          </TopMargin>

          <Margin>
            <Button
              primary
              icon="arrow-back"
              text="Go Back"
              onPress={() => this.props.history.goBack()} />
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
