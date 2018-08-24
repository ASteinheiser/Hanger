import React, { Component } from 'react';
import styled               from 'styled-components/native';

import BottomNavigation from '../../components/bottom-navigation.js';
import TopNavigation    from '../../components/top-navigation.js';
import theme            from '../../theme.js';

export default class ProfileUpload extends Component {
  render() {
    return(
      <Height>

        <BottomNavigation user={this.props.user} setuser={this.props.setuser}>
          <TopNavigation navigation={this.props.navigation}>
            <Container color={theme.palette.canvasColor}>

              <StyledText color={theme.palette.primaryColor}>
                { 'Profile Upload' }
              </StyledText>

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

const StyledText = styled.Text`
  color: ${props => props.color};
  font-size: 24px;
`
