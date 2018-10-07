import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { API, Storage }     from 'aws-amplify';
import ScaledImage          from 'react-native-scalable-image';
import ImagePicker          from 'react-native-image-picker';
import { Avatar }           from 'react-native-material-ui';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';

import Alert             from '../components/alert.js';
import Button            from '../components/button.js';
import Input             from '../components/input.js';
import TopNavigation     from '../components/top-navigation.js';
import theme             from '../theme.js';
import { validateField } from '../functions/validate-field.js';
import { validateForm }  from '../functions/validate-form.js';

import { setUser } from '../redux/actions/user';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    let user = props.user;

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
      profileImage: null,
      loading: false,
      loadingImage: false
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
            this.props.setUser(); // clean out old user so auth routes will update with new info
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
    var pickerOptions = {
      title: 'Select a Photo',
      mediaType: 'photo'
    };
    ImagePicker.showImagePicker(pickerOptions, (response) => {
      if (response.didCancel) {
        // that's okay, do nothing
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({ alertMessage: 'Error Uploading Profile Picture' });
      }
      else {
        const { uri } = response;

        this.setState({ loadingImage: true }, () => {
          fetch(uri)
            .then(response => {
              response.blob()
                .then(blob => {
                  Storage.put('profile-picture.jpeg', blob, {
                    level: 'protected',
                    contentType: 'image/jpeg'
                  })
                    .then(result => {
                      Storage.get('profile-picture.jpeg', {
                        level: 'protected',
                        identityId: this.props.user.id
                      })
                        .then(result => {
                          let profileImage = result.split('?')[0];
                          let params = {
                            body: {
                              profile_img: profileImage
                            }
                          }
                          API.post('HangerAPI', '/v1/user/profile-img', params)
                            .then(response => {
                              let newUser = Object.assign({}, this.props.user, {
                                profile_img: profileImage
                              });
                              this.props.setUser(newUser);
                              this.setState({ loadingImage: false });
                            })
                            .catch(err => {
                              console.error(err);
                              this.setState({ loadingImage: false, alertMessage: 'Error Uploading Profile Picture' });
                            });
                        })
                        .catch(err => {
                          console.error(err);
                          this.setState({ loadingImage: false, alertMessage: 'Error Uploading Profile Picture' });
                        });
                    })
                    .catch(err => {
                      console.error(err);
                      this.setState({ loadingImage: false, alertMessage: 'Error Uploading Profile Picture' });
                    });
                })
                .catch(err => {
                  console.error(err);
                  this.setState({ loadingImage: false, alertMessage: 'Error Uploading Profile Picture' });
                });
            })
            .catch(err => {
              console.error(err);
              this.setState({ loadingImage: false, alertMessage: 'Error Uploading Profile Picture' });
            });
        })
      }
    });
  }

  getImage() {
    Storage.get('profile_img', {
      level: 'protected',
      identityId: this.props.user.id
    })
      .then(result => {
        this.setState({ profileImage: result });
      })
      .catch(err => {
        console.error(err);
        this.setState({ alertMessage: 'Error Loading Profile Picture' });
      });
  }

  render() {
    const { first_name, alertMessage, last_name, display_name, job, location, website, bio, loading, loadingImage } = this.state;

    return(
      <Height>
        <TopNavigation
          back-button
          route='/profile'
          title='Edit Profile Info'>
          <Container color={theme.palette.canvasColor}>

            <AvatarContainer>
              <Touchable onPress={
                loadingImage ?
                  () => {}
                  :
                  this.handleProfileUpload.bind(this)
                }>
                {
                  this.props.user.profile_img ?
                    <Avatar
                      size={120}
                      image={
                        loadingImage ?
                          <DotIndicator size={18} count={3} color={theme.palette.primaryColor}/>
                          :
                          <ScaledImage
                            style={{borderRadius: 60}}
                            height={120}
                            source={{uri: this.props.user.profile_img}} />
                        } />
                    :
                    <Avatar icon='person' iconColor='gray' size={120} iconSize={100} />
                }
              </Touchable>
            </AvatarContainer>

            <Alert message={alertMessage} />

            <InputMargin>
              <Input accent
                onChange={this.onChange.bind(this, 'first_name')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'First Name'}
                value={first_name.value}
                error={!first_name.valid ? 'Enter a first name.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'last_name')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Last Name'}
                value={last_name.value}
                error={!last_name.valid ? 'Enter a last name.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'display_name')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Username'}
                value={display_name.value}
                error={!display_name.valid ? 'Enter a username.' : ''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'job')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Job'}
                value={job.value}
                error={''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'location')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Location'}
                value={location.value}
                error={''}
                />

              <Input accent
                onChange={this.onChange.bind(this, 'website')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Website'}
                value={website.value}
                error={''}
                />
              <Input accent
                onChange={this.onChange.bind(this, 'bio')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Bio'}
                value={bio.value}
                error={''}
                />
            </InputMargin>

            <TopMargin>
              {
                loading ?
                  <DotIndicator size={18} count={3} color={theme.palette.primaryColor}/>
                  :
                  <Button
                    accent
                    icon="person"
                    text="Update Profile"
                    disabled={loading}
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

const mapStateToProps = ({ user }) => {
  return { user };
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
