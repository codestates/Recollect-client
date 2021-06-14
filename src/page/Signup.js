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
      .post('http://recollect.today/signup', {
        username: username,
        socialId: this.state.socialId,
        isSocialAccount: 1,
      })
      .then((res) => {
        axios
          .post('http://recollect.today/login', {
            uuid: res.data.uuid,
          })
          .then(() => {
            this.props.socialLoginSuccess();
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //! 자체 회원 socialId = 0 안넣어줘도 됨
  handleCreateAccount({ username, email, password }) {
    axios
      .post('http://recollect.today/signup', {
        username: username,
        email: email,
        password: password,
        isSocialAccount: 0, //[서버] 타입 궁금...?
      })
      .then(() => {
        this.props.history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    console.log(this.props.history.location);
    this.setState({
      socialId: this.props.history.location.state, //socialId 존재 여부에 따라 signupcomp 렌더 분기
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
