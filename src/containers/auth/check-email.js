import React  from 'react';
import styled from 'styled-components/native';

import Button     from '../../components/button.js';
import HeaderText from '../../components/header-text.js';

import HangerLogo   from '../../../assets/icons/hanger-white.png';
import Photographer from '../../../assets/images/photographer.jpeg';

export default class CheckEmail extends React.Component {
  render() {
    return (
      <Flex>
        <BackgroundImage source={Photographer} />
        <BackgroundFilter />

        <Container>
          <TopPadding>
            <FullWidth>
              <HangerImage small source={HangerLogo} />
            </FullWidth>
          </TopPadding>

          <HeaderText small
            text='Verify Your Email'
            body='To finish your registration, please check your email for a verification link.' />

          <Margin>
            <Button
              primary
              icon=""
              text="BACK TO LOGIN"
              onPress={()=> { this.props.history.push('/') }} />
          </Margin>
        </Container>
      </Flex>
    );
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

const BackgroundFilter = styled.View`
  position: absolute;

  height: 100%;
  width: 100%;

  background: rgba(0, 0, 0, 0.5);

  z-index: 2;
`

const FullWidth = styled.View`
  width: 100%;
`

const TopPadding = styled.View`
  padding-top: 25px;
`
