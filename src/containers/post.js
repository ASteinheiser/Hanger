import React, { Component } from 'react';
import { withRouter }       from 'react-router-native';
import ScaledImage          from 'react-native-scalable-image';
import styled               from 'styled-components/native';

import TopNavigation       from '../components/top-navigation.js';
import theme               from '../theme.js';

class Post extends Component {
  render() {
    const { search } = this.props.location;
    let imageURI = '';
    // make sure that we have the local image uri in the query
    if(search && typeof search === 'string') {
      let query = search.split('?image=');
      // we have the uri
      if(query.length > 1) {
        imageURI = query[1];
      } else {
        this.props.history.push('/home');
      }
    } else {
      this.props.history.push('/home');
    }

    return(
      <Height>
        <TopNavigation
          back-button
          route='/home'
          title='Create Post'>
          <Container color={theme.palette.canvasColor}>
            <Centered>
              <ScaledImage
                height={300}
                source={{uri: imageURI}} />
            </Centered>
          </Container>
        </TopNavigation>
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

const Centered = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`

export default withRouter(Post);
