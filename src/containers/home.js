import React, { Component } from 'react';
import { API }              from 'aws-amplify';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation from '../components/bottom-navigation.js';
import FeedPost         from '../components/feed-post.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      feedPosts: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      API.get('HangerAPI', '/v1/user/feed?page=1')
        .then(response => {
          this.setState({ loading: false, feedPosts: response });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { loading, feedPosts } = this.state;

    let FeedPosts = null;
    if(feedPosts) {
      FeedPosts = _map(feedPosts.posts, post =>
        <FeedPost
          key={post.id}
          description={post.description}
          image={post.img_uri} />
      );
    }

    return (
      <Height>
        <BottomNavigation>
          <TopNavigation>
            <Container color={theme.palette.canvasColor}>

              {
                loading ?
                  <Spacing>
                    <DotIndicator size={18} color={theme.palette.primaryColor}/>
                  </Spacing>
                  :
                  feedPosts ?
                    FeedPosts
                    :
                    <StyledText color={theme.palette.primaryColor}>
                      {'Feed Unavailable...'}
                    </StyledText>
              }

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

const Spacing = styled.View`
  margin-top: 50px;
`

const StyledText = styled.Text`
  font-size: 24px;
  color: ${props => props.color};
  text-align: center;
  padding: 50px 25px;
`
