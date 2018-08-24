import React, { Component } from 'react';
import { API }              from 'aws-amplify';
import { Avatar }           from 'react-native-material-ui';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import Input             from '../../components/input.js';
import TopNavigation     from '../../components/top-navigation.js';
import theme             from '../../theme.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name:   { value: '', valid: true },
      last_name:    { value: '', valid: true },
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      display_name: this.state.display_name
    };
    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true }, () => {
        this.clearAlert();

        let params = {
          body: {
            first_name: this.state.first_name.value,
            last_name: this.state.last_name.value,
            display_name: this.state.display_name.value,
          }
        };
        if (this.state.location.value) params.body.location = this.state.location.value;

        API.post('HangerAPI', '/v1/user', params)
          .then(response => {
            this.props.setuser(); // clean out old user so auth routes will update with new info
            this.setState({ loading: false });
            this.props.history.replace('/profile');
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

  render() {
    return(
      <Height>

        <TopNavigation
          back-button
          route='/profile'
          title='Edit Profile Info'
          navigation={this.props.navigation}>
          <Container color={theme.palette.canvasColor}>

            <AvatarContainer>
              <Touchable onPress={() => this.props.history.push('/profile-upload')}>
                <Avatar icon='person' iconColor='gray' size={80} iconSize={60} />
              </Touchable>
            </AvatarContainer>

            <Alert message={this.state.alertMessage} />

            <InputMargin>
              <Input accent
                onChange={this.onChange.bind(this, 'first_name')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'First Name'}
                value={this.state.first_name.value}
                error={!this.state.first_name.valid ? 'Enter a first name.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'last_name')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Last Name'}
                value={this.state.last_name.value}
                error={!this.state.last_name.valid ? 'Enter a last name.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'display_name')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Public Username'}
                value={this.state.display_name.value}
                error={!this.state.display_name.valid ? 'Enter a user name.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'location')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Location (Optional)'}
                value={this.state.location.value}
                error={''}
                />
            </InputMargin>

            <TopMargin>
              {
                this.state.loading ?
                  <DotIndicator size={18} count={3} color={theme.palette.primaryColor}/>
                  :
                  <Button
                    accent
                    icon="person"
                    text="Update Profile"
                    disabled={this.state.loading}
                    onPress={this.handleSubmit.bind(this)} />
              }
            </TopMargin>

          </Container>
        </TopNavigation>

      </Height>
    );
  }
}

const Height = styled.View`
  height: 100%;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
`

const Touchable = styled.TouchableOpacity`
  z-index: 100;
`

const AvatarContainer = styled.View`
  margin: 30px auto 20px auto;
`

const TopMargin = styled.View`
  margin: 30px 20% 20px 20%;
`

const InputMargin = styled.View`
  margin: 0 5%;
`

const TopPadding = styled.View`
  padding-top: 25px;
`
