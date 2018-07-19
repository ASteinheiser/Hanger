import React, { Component }    from 'react';
import { NativeRouter, Route } from 'react-router-native';

import Camera from '../containers/upload/camera.js';

export default class LoginRouter extends React.Component {
  render() {
    return(
      <NativeRouter>
        <Route path="/" component={Camera}/>
      </NativeRouter>
    );
  }
}
