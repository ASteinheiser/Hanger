import React, { Component } from 'react';
import { API }              from 'aws-amplify';
import styled               from 'styled-components/native';

import Button from './button';
import Input  from './input';

export default class CommentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    };
  }

  handleComment() {
    const { comment } = this.state;

    if(comment !== '') {
      let postId = this.props.key;
      let params = {
        body: {
          comment
        }
      };

      API.post('HangerAPI', `/v1/user/post/like/${postId}`, params)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  handleUpdate(e) {
    if(e.nativeEvent) {
      this.setState({ comment: e.nativeEvent.text });
    }
  }

  render() {
    return(
      <CommentContainer>
        {
          this.props.comments ?
            null
            :
            <StyledText>
              {'Be the first to comment!'}
            </StyledText>
        }

        <Input accent multiline
          onChange={this.handleUpdate.bind(this)}
          containerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          label={'Comment'}
          value={this.state.comment}
          error={''} />

        <Button
          accent
          text="Post Comment"
          onPress={this.handleComment.bind(this)} />

      </CommentContainer>
    );
  }
}

const CommentContainer = styled.View`
  padding: 25px 25px 50px;
`

const StyledText = styled.Text`
  font-size: 18px;

`
