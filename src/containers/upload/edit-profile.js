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

    let user = props.user;
    if(user && typeof user === 'string') user = JSON.parse(user);

    this.state = {
      first_name: {
        value: user.first_name ? user.first_name : '',
        valid: true
      },
      last_name: {
        value: user.last_name ? user.last_name : '',
        valid: true
      },
      display_name: {
        value: user.display_name ? user.display_name : '',
        valid: true
      },
      job: {
        value: user.job ? user.job : '',
        valid: true
      },
      location: {
        value: user.location ? user.location : '',
        valid: true
      },
      website: {
        value: user.website ? user.website : '',
        valid: true
      },
      bio: {
        value: user.bio ? user.bio : '',
        valid: true
      },
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
        if (this.state.job.value) params.body.job = this.state.job.value;
        if (this.state.location.value) params.body.location = this.state.location.value;
        if (this.state.website.value) params.body.website = this.state.website.value;
        if (this.state.bio.value) params.body.bio = this.state.bio.value;

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

  handleProfileUpload() {
    console.log('profile upload click!');
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
              <Touchable onPress={this.handleProfileUpload.bind(this)}>
                <Avatar icon='person' iconColor='gray' size={120} iconSize={100} />
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
                label={'Username'}
                value={this.state.display_name.value}
                error={!this.state.display_name.valid ? 'Enter a username.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'job')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Job'}
                value={this.state.job.value}
                error={''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'location')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Location'}
                value={this.state.location.value}
                error={''}
                />

              <Input accent
                onChange={this.onChange.bind(this, 'website')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Website'}
                value={this.state.website.value}
                error={''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'bio')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Bio'}
                value={this.state.bio.value}
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
  margin: 15px auto 20px auto;
`

const TopMargin = styled.View`
  margin: 30px 20% 20px 20%;
`

const InputMargin = styled.View`
  margin: 0 5%;
`
