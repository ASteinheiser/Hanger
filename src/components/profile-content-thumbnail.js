import React     from 'react';
import { Image } from 'react-native';
import styled    from 'styled-components';

export default class ProfileContentThumbnail extends React.Component {
  render() {
    return (
      <StyledImage source={{uri: this.props.link }} alt='profile-content' />
    )
  }
}

const StyledImage = styled.Image`
  height: 150px;
  width: 33%;

  margin-bottom: 2px;
`
