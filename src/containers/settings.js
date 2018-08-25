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

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <TopNavigation navigation={this.props.navigation}>
            <Container color={theme.palette.canvasColor}>

              <IconWithText
                text='Account Settings'
                icon='settings'
                />

              <Margin>
                <Button
                  accent
                  icon="subdirectory-arrow-left"
                  text="Logout"
                  onPress={this.handleSignout.bind(this)} />
              </Margin>

              <Margin>
                <Button
                  accent
                  text="Try Premium Account"
                  onPress={() => {console.log('try premium account!')}} />
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
`

const Margin = styled.View`
  margin: 10px 20px 10px 20px;
`
