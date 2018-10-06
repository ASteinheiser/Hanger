import React, { Component } from 'react';
import { API, Storage }     from 'aws-amplify';
import { withRouter }       from 'react-router-native';
import ScaledImage          from 'react-native-scalable-image';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';

import Alert             from '../components/alert.js';
import Button            from '../components/button.js';
import Input             from '../components/input.js';
import TopNavigation     from '../components/top-navigation.js';
import theme             from '../theme.js';
import { uuidv4 }        from '../functions/uuid-v4.js';
import { validateForm }  from '../functions/validate-form.js';
import { validateField } from '../functions/validate-field.js';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: { value: '', valid: true },
      alertMessage: '',
      imageURI: '',
      loading: false
    };

    this.handleProfileUpload = this.handleProfileUpload.bind(this);
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
    const { description } = this.state;
    const formObject = { description };

    const { formValid, emptyFields } = validateForm(formObject);

    if (formValid) {
      this.setState({ loading: true }, () => {
        this.clearAlert();

        this.handleProfileUpload()
          .then(imageUrl => {
            let params = {
              body: {
                description: description.value,
                image: imageUrl
              }
            };

            API.post('HangerAPI', '/v1/post', params)
              .then(response => {
                this.setState({ loading: false });
                this.props.history.replace('/home');
              })
              .catch(err => {
                console.error(err);
                this.setState({ loading: false, alertMessage: err.message });
              });
          })
          .catch(err => {
            console.error(err);
            this.setState({ loading: false, alertMessage: 'Error Uploading Profile Picture' });
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
    return new Promise((resolve, reject) => {
      const { imageURI } = this.state;

      fetch(imageURI)
        .then(response => {
          response.blob()
            .then(blob => {
              let fileName = `${uuidv4()}.jpeg`;
              Storage.put(fileName, blob, {
                level: 'protected',
                contentType: 'image/jpeg'
              })
                .then(result => {
                  Storage.get(fileName, {
                    level: 'protected',
                    identityId: this.props.user.id
                  })
                    .then(result => {
                      let profileImage = result.split('?')[0];

                      resolve(profileImage);
                    })
                    .catch(err => {
                      reject(err);
                    });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  componentWillMount() {
    const { search } = this.props.location;
    let imageURI = '';
    // make sure that we have the local image uri in the query
    if(search && typeof search === 'string') {
      let query = search.split('?image=');
      // we have the uri
      if(query.length > 1) {
        imageURI = query[1];
        this.setState({ imageURI });
      } else {
        this.props.history.push('/home');
      }
    } else {
      this.props.history.push('/home');
    }
  }

  render() {
    const { imageURI, alertMessage, loading, description } = this.state;

    return(
      <Height>
        <TopNavigation
          back-button
          route='/home'
          title='Create Post'>
          <Container color={theme.palette.canvasColor}>
            <Centered>
              <ScaledImage
                height={400}
                source={{uri: imageURI}} />
            </Centered>

            <Alert message={alertMessage} />

            <InputMargin>
              <Input accent
                disabled={loading}
                onChange={this.onChange.bind(this, 'description')}
                containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                label={'Description'}
                value={description.value}
                error={!description.valid ? 'Enter a description' : ''}
                />
            </InputMargin>

            <TopMargin>
              {
                loading ?
                  <DotIndicator size={18} count={3} color={theme.palette.primaryColor}/>
                  :
                  <Button
                    accent
                    icon="add"
                    text="CREATE POST"
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

const Centered = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 25px;
`

const TopMargin = styled.View`
  margin: 30px 20% 20px 20%;
`

const InputMargin = styled.View`
  margin: 0 5%;
`

export default withRouter(Post);
