import React                from 'react';
import { View, ScrollView } from 'react-native';
import styled               from 'styled-components/native';

import HeaderText        from '../../components/header-text.js';
import Button            from '../../components/button.js';
import Input             from '../../components/input.js';
import TopNavigation     from '../../components/top-navigation.js';
import theme             from '../../theme.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', valid: true }
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
      this.props.history.replace('/');
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

          <HeaderText text='Reset Password' />

          <Input
            keyboardType={'email-address'}
            onChange={this.onChange.bind(this, 'email')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Email Address'}
            value={this.state.email.value}
            error={!this.state.email.valid ? 'Enter a valid email.' : ''}
            />

          <TopMargin>
            <Button
              primary
              icon="subdirectory-arrow-right"
              text="Reset Password"
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
