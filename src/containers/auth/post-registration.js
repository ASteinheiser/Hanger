import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { API, Auth }        from 'aws-amplify';
import styled               from 'styled-components/native';
import { DotIndicator }     from 'react-native-indicators';

import Alert             from '../../components/alert.js';
import Button            from '../../components/button.js';
import HeaderText        from '../../components/header-text.js';
import Input             from '../../components/input.js';
import { validateField } from '../../functions/validate-field.js';
import { validateForm }  from '../../functions/validate-form.js';

import HangerLogo       from '../../../assets/icons/hanger-white.png';
import JacketBackground from '../../../assets/images/leather-jacket.jpg';

import { setUser } from '../../redux/actions/user';

class PostRegistration extends Component {
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

        API.post('HangerAPI', '/v1/user/post-registration', params)
          .then(response => {
            this.props.setUser(); // clean out old user so auth routes will update with new info
            this.setState({ loading: false });
            this.props.history.push('/home')
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
    Auth.signOut();
    this.props.setUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <Flex>
        <BackgroundImage source={JacketBackground} />

        <Container>
          <TopPadding>
            <FullWidth>
              <HangerImage small source={HangerLogo} />
            </FullWidth>
          </TopPadding>

          <HeaderText small
            text='Tell Us More'
            body='Finish filling out your account details.' />

          <Alert message={this.state.alertMessage} />

          <InputMargin>
            <Input
              onChange={this.onChange.bind(this, 'first_name')}
              containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
              label={'First Name'}
              value={this.state.first_name.value}
              error={!this.state.first_name.valid ? 'Enter a first name.' : ''}
              />
            <Input
              onChange={this.onChange.bind(this, 'last_name')}
              containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
              label={'Last Name'}
              value={this.state.last_name.value}
              error={!this.state.last_name.valid ? 'Enter a last name.' : ''}
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
          </InputMargin>

          <TopMargin>
            {
              this.state.loading ?
                <DotIndicator size={18} count={3} color={'#ffffff'}/>
                :
                <Button
                  primary
                  icon="person"
                  text="Create Profile"
                  disabled={this.state.loading}
                  onPress={this.handleSubmit.bind(this)} />
            }
          </TopMargin>

          <Margin>
            <Button
              primary
              icon="arrow-back"
              text="Go Back"
              onPress={this.handleBackButton.bind(this)} />
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

const FullWidth = styled.View`
  width: 100%;
`

const InputMargin = styled.View`
  margin: 0 5%;
`

const TopPadding = styled.View`
  padding-top: 25px;
`

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(PostRegistration);
