import React from 'react';
import axios from 'axios';

import SignupComp from '../components/SignupComp';
import Footer from '../components/Footer';
import BackBtn from '../components/BackBtn';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialId: null,
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleCreateSocialAccount = this.handleCreateSocialAccount.bind(this);
  }

  handleCreateSocialAccount({ username }) {
    axios
      .post('process.env.REACT_APP_API_URI/signup', {
        username: username,
        socialId: this.state.socialId,
        isSocialAccount: 1,
      })
      .then((res) => {
        axios
          .post('process.env.REACT_APP_API_URI/login', {
            uuid: res.data.uuid,
          })
          .then((res) => {
            this.props.loginSuccess(res.data.username);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //! 비소셜 회원 socialId = 0 안넣어줘도 됌
  handleCreateAccount({ username, email, password }) {
    axios
      .post('process.env.REACT_APP_API_URI/signup', {
        username: username,
        email: email,
        password: password,
        isSocialAccount: 0,
      })
      .then((res) => {
        this.props.history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    console.log(this.props.history.location);
    this.setState({
      socialId: this.props.history.location.state,
    });
  }

  render() {
    return (
      <div id="signup-container">
        <div id="signup-backbtn-container">
          <BackBtn history={this.props.history} id="signup-backbtn" />
        </div>
        <SignupComp
          isSocialLogin={this.state.socialId}
          handleCreateAccount={this.handleCreateAccount}
          handleCreateSocialAccount={this.handleCreateSocialAccount}
        />
        <Footer />
      </div>
    );
  }
}
export default Signup;
