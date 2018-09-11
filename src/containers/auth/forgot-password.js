import React, { Component } from 'react';
import { Auth }             from 'aws-amplify';
import styled               from 'styled-components/native';
import { DotIndicator }     from 'react-native-indicators';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

import HangerLogo     from '../../../assets/icons/hanger-white.png';
import Photographer   from '../../../assets/images/photographer.jpeg';

export default class ForgotPassword extends Component {
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
            text='Reset Password Request'
            body='To reset your password, enter your email and you will receive a reset code.' />

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
          </InputMargin>

          <TopMargin>
            {
              this.state.loading ?
                <DotIndicator size={18} count={3} color={'#ffffff'}/>
                :
                <Button
                  primary
                  disabled={this.state.loading}
                  icon="subdirectory-arrow-right"
                  text="Reset Password"
                  onPress={this.handleSubmit.bind(this)} />
            }
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
