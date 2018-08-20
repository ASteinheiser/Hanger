import React    from 'react';
import { Auth } from 'aws-amplify';
import styled   from 'styled-components/native';

import BottomNavigation from '../components/bottom-navigation.js';
import Button           from '../components/button.js';
import IconWithText     from '../components/icon-with-text.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

export default class Settings extends React.Component {

  handleSignout() {
    this.props.setuser();
    Auth.signOut();
    this.props.history.replace('/');
  }

  render() {
    return (
      <Height>
        <TopNavigation navigation={this.props.navigation} />

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <Container color={theme.palette.canvasColor}>

            <IconWithText
              text='Account Settings'
              icon='settings'
              />

            <Margin>
              <Button
                primary
                icon="subdirectory-arrow-left"
                text="Logout"
                onPress={this.handleSignout.bind(this)} />
            </Margin>

          </Container>
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
`

const Margin = styled.View`
  margin: 20px 20px 20px 20px;
`
