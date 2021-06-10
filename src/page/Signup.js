import React from "react";
import axios from 'axios';


import SignupComp from '../components/SignupComp'
import Footer from '../components/Footer'

class Signup extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        isSocialLogin: true,
      }
  }

  render() {
    return (
      /*<BackBtn/>*/
      <div>
      <SignupComp isSocialLogin={this.state.isSocialLogin}/>
      <Footer/>
      </div>
    )

  }
}
export default Signup
