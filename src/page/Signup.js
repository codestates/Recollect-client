import React, { Component } from "react";
import axios from 'axios';

import SignupComp from '../components/SignupComp'

export default class Signup extends Component {
  constructor(props) {
    super(props)
      this.state = {
        isSocialLogin: true,
      }
  }

  render() {
    return (
    /*<Back/>*/
    <SignupComp isSocialLogin={this.state.isSocialLogin}/>
    )

  }
}
