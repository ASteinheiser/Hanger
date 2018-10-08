import React, { Component } from 'react';
import { API }              from 'aws-amplify';
import { DotIndicator }     from 'react-native-indicators';
import styled               from 'styled-components/native';
import _map                 from 'lodash.map';

import BottomNavigation from '../components/bottom-navigation.js';
import FeedPost         from '../components/feed-post.js';
import TopNavigation    from '../components/top-navigation.js';
import theme            from '../theme.js';

import SAMPLE_POSTS from '../../assets/data/posts.json';

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
          console.log(response);
          this.setState({ loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { loading } = this.state;
    const FeedPosts = _map(SAMPLE_POSTS, post =>
      <FeedPost
        key={post.id}
        title={post.title}
        image={post.image} />
    );

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
                  FeedPosts
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
