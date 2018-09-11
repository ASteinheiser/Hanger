import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Auth }             from 'aws-amplify';
import styled               from 'styled-components/native';

import BottomNavigation from '../components/bottom-navigation.js';
import Button           from '../components/button.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

import { setUser } from '../redux/actions/user';

class Settings extends Component {

  handleSignout() {
    Auth.signOut();
    this.props.setUser();
    this.props.history.replace('/');
  }

  render() {
    return (
      <Height>
        <BottomNavigation>
          <TopNavigation title='Settings'>
            <Container color={theme.palette.canvasColor}>
              <Margin>
                <Button
                  accent
                  icon='notifications-active'
                  text='Notifications'
                  onPress={() => {console.log('changing notifications!')}} />
              </Margin>

              <Margin>
                <Button
                  accent
                  icon='stars'
                  text='Try Premium Account'
                  onPress={() => {console.log('try premium account!')}} />
              </Margin>

              <Margin>
                <Button
                  accent
                  icon='subdirectory-arrow-left'
                  text='Logout'
                  onPress={this.handleSignout.bind(this)} />
              </Margin>

              <Margin>
                <Button
                  accent
                  icon='delete-forever'
                  text='Delete Account'
                  onPress={() => {console.log('deleting account!')}} />
              </Margin>

            </Container>
          </TopNavigation>
        </BottomNavigation>
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

  padding-top: 15px;
`

const Margin = styled.View`
  margin: 10px 20px 10px 20px;
`

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(Settings);
