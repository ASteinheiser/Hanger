import React                      from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, Icon, Toolbar }  from 'react-native-material-ui';
import SplashScreen               from 'react-native-splash-screen';
import Image                      from 'react-native-scalable-image';
import styled                     from 'styled-components';

import theme from '../theme.js';
import logo  from '../../assets/hanger-text-logo-black.png';

export default class Home extends React.Component {

  componentWillMount() {
    setTimeout(() => { SplashScreen.hide(); }, 1000);
  }

  render() {
    return (
      <Flex>
        <Toolbar centerElement={
          <Centered>
            <Image source={logo} height={40} />
          </Centered>
        }
        leftElement={
          <MarginLeft>
            <Avatar icon='person' iconColor='gray' size={35} iconSize={25} />
          </MarginLeft>
        }
        rightElement={
          <MarginRight>
            <Icon name='notifications' size={30} />
          </MarginRight>
        } />

        <Container color={theme.palette.canvasColor}>
          <Margin>
            <FlexRow>
              <MarginRight>
                <Icon name='home'/>
              </MarginRight>
              <StyledText>
                Welcome to the home
              </StyledText>
            </FlexRow>
          </Margin>
        </Container>
      </Flex>
    )
  }
}

const Flex = styled.View`
  flex: 1;
`

const Container = styled.ScrollView`
  background-color: ${props => props.color};
  flex: 1;
`

const Centered = styled.View`
  margin: 0 auto;
  padding-right: 20px;
`

const Margin = styled.View`
  margin: 25px 20px;
`

const StyledText = styled.Text`
  font-size: 16px;
`

const FlexRow = styled.View`
  flex: 1;
  flex-direction: row;
`

const MarginRight = styled.View`
  margin-right: 10px;
`

const MarginLeft = styled.View`
  margin-left: 10px;
`
