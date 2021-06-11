import React from "react";
import axios from 'axios';


import SignupComp from '../components/SignupComp'
import Footer from '../components/Footer'
import BackBtn from '../components/BackBtn'

class Signup extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        isSocialLogin: true,
        socialId: null,
      }
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  handleCreateSocialAccount({ username }) {
    axios
      .post('http://recollect.today/signup', {
        username: username,
        email: this.state.socialId,
        isSocialAccount: 1,
      })
      .then(res => {
        this.props.loginSuccess(res.data.username)
      })
      .catch(err => {
        console.log(err)
      })
  }


  handleCreateAccount({ username, email, password }) {
    axios
      .post('http://recollect.today/signup', {
        username: username,
        email: email,
        password: password,
        isSocialAccount: 0,
      })
      .then(res => {
        this.props.loginSuccess(res.data.username) 
      })
      .catch( err => {
        console.log(err)
      })
  }

  componentDidMount() {
    console.log(this.props.history)
    this.setState({
      isSocialLogin: null,
      socialId: null,
    })
  }

  render() {
    return (
      <div id="signup-container">
        <div id="signup-backbtn-container">
          <BackBtn history={this.props.history} id="signup-backbtn"/> 
        </div>
        <SignupComp 
          isSocialLogin={this.state.isSocialLogin}
          handleCreateAccount={this.handleCreateAccount}
          handleCreateSocialAccount={this.handleCreateSocialAccount}/>
        <Footer/>
      </div>
      
    )

  }
}
export default Signup
