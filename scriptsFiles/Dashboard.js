import React, { Component } from 'react';
import Router from './Router'

export default class Dashboard extends Component {
  static navigationOptions = {
    header: false
  }
  state = {}
  render() {
    return <Router/>
  }
}

