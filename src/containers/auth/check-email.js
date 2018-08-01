import React  from 'react';
import styled from 'styled-components/native';

import Button        from '../../components/button.js';
import HeaderText    from '../../components/header-text.js';
import TopNavigation from '../../components/top-navigation.js';
import theme         from '../../theme.js';

export default class CheckEmail extends React.Component {
  render() {
    return (
      <Height>
        <TopNavigation no-buttons />

        <Container color={theme.palette.canvasColor}>

          <HeaderText text='Please check your email for a verification link.' />

          <Margin>
            <Button
              primary
              icon=""
              text="BACK TO LOGIN"
              onPress={()=> { this.props.history.push('/') }} />
          </Margin>
        </Container>
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
  margin: 50px 20px 20px 20px;
`
