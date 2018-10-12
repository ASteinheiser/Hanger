import React, { Component } from 'react';
import styled               from 'styled-components/native';

import Facebook       from '../../assets/icons/facebook.png';
import FacebookColor  from '../../assets/icons/facebook-color.png';
import Instagram      from '../../assets/icons/instagram.png';
import InstagramColor from '../../assets/icons/instagram-color.png';
import LinkedIn       from '../../assets/icons/linked-in.png';
import LinkedInColor  from '../../assets/icons/linked-in-color.png';
import Pinterest      from '../../assets/icons/pinterest.png';
import PinterestColor from '../../assets/icons/pinterest-color.png';
import Twitter        from '../../assets/icons/twitter.png';
import TwitterColor   from '../../assets/icons/twitter-color.png';
import theme          from '../theme.js';

export default class SocialMediaAccounts extends Component {
  render() {
    const { user } = this.props;

    return(
      <SocialContainer>

        <ActiveBg active={user.facebook} color={theme.palette.disabledColor}>
          <SocialMediaLogo source={user.facebook ? FacebookColor : Facebook} />
        </ActiveBg>

        <ActiveBg active={false} color={theme.palette.disabledColor}>
          <SocialMediaLogo source={Instagram} />
        </ActiveBg>

        <ActiveBg active={false} color={theme.palette.disabledColor}>
          <SocialMediaLogo source={LinkedIn} />
        </ActiveBg>

        <ActiveBg active={false} color={theme.palette.disabledColor}>
          <SocialMediaLogo source={Pinterest} />
        </ActiveBg>

        <ActiveBg active={false} color={theme.palette.disabledColor}>
          <SocialMediaLogo source={Twitter} />
        </ActiveBg>

      </SocialContainer>
    );
  }
}

const SocialContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;

  padding: 20px;
`

const SocialMediaLogo = styled.Image`
  width: 35px;
  height: 35px;
`

const ActiveBg = styled.View`
  width: 40px;
  height: 40px;

  justify-content: center;
  align-items: center;

  border-radius: 20px;
  background: ${props => props.active ? props.color : 'white'};
`
