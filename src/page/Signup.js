import React from "react";
import axios from "axios";

import SignupComp from "../components/SignupComp";
import Footer from "../components/Footer";
import BackBtn from "../components/BackBtn";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialId: null,
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  async handleCreateSocialAccount({ username }) {
    const uuid = await axios.post('http://recollect.today/signup', {
        username: username,
        socialId: this.state.socialId,
        isSocialAccount: 1,
      })
      .then(res => {
        return res.data.uuid;
      })
      .catch(err => {
        console.log(err);
        return;
      })

    await axios.post('http://recollect.today/login', {
        uuid: uuid
      })
      .then(res => {
        this.props.loginSuccess(res.data.username);
      })
      .catch(err =>{
        console.log(err);
      })

  }

  handleCreateAccount({ username, email, password }) {
    axios
      .post("http://recollect.today/signup", {
        username: username,
        email: email,
        password: password,
        isSocialAccount: 0,
      })
      .then(res => {
        this.props.history.push('/login') 
      })
      .catch( err => {
        console.log(err)
      })
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
