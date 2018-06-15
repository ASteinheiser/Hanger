import React                 from 'react';
import { View, ScrollView }  from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled                from 'styled-components';

import Button             from '../components/button.js';
import Divider            from '../components/divider.js';
import Input              from '../components/input.js';
import TopNavigationBasic from '../components/top-navigation-basic.js';
import theme              from '../theme.js';

export default class Login extends React.Component {
  render() {
    return (
      <Flex>
        <TopNavigationBasic />

        <Container color={theme.palette.canvasColor}>
          <Input
            keyboardType={'email-address'}
            // onChange
            // onSubmitEditing
            placeholder={'Email Address'}
            // value
            />
          <Input
            secureTextEntry={true}
            // onChange
            // onSubmitEditing
            placeholder={'Password'}
            // value
            />

          <TopMargin>
            <Button
              accent
              icon="subdirectory-arrow-right"
              text="Login"
              onPress={() => this.props.navigation.navigate('Home')} />
          </TopMargin>

          <Divider />

          <Margin>
            <Button
              primary
              icon="assignment"
              text="Register"
              onPress={()=> {
                this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [ NavigationActions.navigate({ routeName: 'Register'}) ]
                }))
              }} />
          </Margin>
          <Margin>
            <Button
              primary
              icon="help-outline"
              text="Forgot Password"
              onPress={()=> {
                this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [ NavigationActions.navigate({ routeName: 'ForgotPassword'}) ]
                }))
              }} />
          </Margin>
        </Container>
      </Flex>
    );
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`

const Margin = styled.View`
  margin: 20px 20px 0 20px;
`

const TopMargin = styled.View`
  margin: 30px 20px 0 20px;
`
