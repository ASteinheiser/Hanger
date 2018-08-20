import React         from 'react';
import { API, Auth } from 'aws-amplify';
import styled        from 'styled-components/native';

import Alert             from '../components/alert.js';
import Button            from '../components/button.js';
import HeaderText        from '../components/header-text.js';
import Input             from '../components/input.js';
import TopNavigation     from '../components/top-navigation.js';
import theme             from '../theme.js';
import { validateField } from '../functions/validate-field.js';
import { validateForm }  from '../functions/validate-form.js';

export default class PostRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:         { value: '', valid: true },
      display_name: { value: '', valid: true },
      location:     { value: '', valid: true },
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
      name: this.state.name,
      display_name: this.state.display_name
    };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true }, () => {
        this.clearAlert();

        let params = {
          body: {
            name: this.state.name.value,
            display_name: this.state.display_name.value,
            Username: this.props.user.username
          }
        };
        if (this.state.location.value) params.body.location = this.state.location.value;

        API.post('HangerAPI', '/v1/user/post-registration', params)
          .then(response => {
            this.setState({ loading: false });
            this.props.history.replace('/home');
          })
          .catch(err => {
            console.log(err);
            this.setState({ loading: false, alertMessage: err.message });
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

  handleBackButton() {
    this.props.setuser();
    Auth.signOut();
    this.props.history.push('/');
  }

  render() {
    return (
      <Height>
        <TopNavigation
          back-button
          route='/'
          onpress={this.handleBackButton.bind(this)}
          history={this.props.history} />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Tell Us More' />

          <Alert message={this.state.alertMessage} />

          <Input
            onChange={this.onChange.bind(this, 'name')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Full Name'}
            value={this.state.name.value}
            error={!this.state.name.valid ? 'Enter a name.' : ''}
            />
          <Input
            onChange={this.onChange.bind(this, 'display_name')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Public Username'}
            value={this.state.display_name.value}
            error={!this.state.display_name.valid ? 'Enter a user name.' : ''}
            />
          <Input
            onChange={this.onChange.bind(this, 'location')}
            containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            label={'Location (Optional)'}
            value={this.state.location.value}
            error={''}
            />

          <Margin>
            <Button
              primary
              icon="person"
              text="Create Profile"
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
