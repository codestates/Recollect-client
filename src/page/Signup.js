import React from "react";
import axios from 'axios';


import SignupComp from '../components/SignupComp'
import Footer from '../components/Footer'

class Signup extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        isSocialLogin: false,
      }
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  handleCreateAccount({ username, email, password }) {
    this.props.loginSuccess(username) 
    // axios
    // .post('/signup', {
    //   username: username,
    //   email: email,
    //   password: password,
    // })
    // .then(res => {
    //   this.props.handleLoginSuccess(res.data.username) 
    // })
    // .catch( err => {
    //   console.log(err)
    // })
  }

  render() {
    return (
      /*<BackBtn/>*/
      <div id="signup">
      <SignupComp 
        isSocialLogin={this.state.isSocialLogin}
        handleCreateAccount={this.handleCreateAccount}/>
      <Footer/>
      </div>
    )

  }
}
export default Signup
