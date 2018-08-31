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

export default class SocialMediaAccounts extends Component {
  render() {
    return(
      <SocialContainer>
        <SocialMediaLogo source={Facebook} />
        <SocialMediaLogo source={Instagram} />
        <SocialMediaLogo source={LinkedIn} />
        <SocialMediaLogo source={Pinterest} />
        <SocialMediaLogo source={Twitter} />
      </SocialContainer>
    );
  }
}

const SocialContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;

  padding: 20px;
`

const SocialMediaLogo = styled.Image`
  width: 35px;
  height: 35px;

  margin: 0 auto;
`
