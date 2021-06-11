import React from "react";
import axios from 'axios';

const { IsValidiateUsername, IsValidiatePassword } = require('../util/validiation')

class SignupComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordcheck: '',
      errormessage: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleCreateSocialAccount = this.handleCreateSocialAccount.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value});
  };

  handleCreateSocialAccount() {
    const { username } = this.state;

    if (!IsValidiateUsername(username)) {
      this.setState({
        errormessage: "유저네임은 영문 대소문자, 숫자, 언더바, 하이픈을 사용해 4글자이상 16글자 이하로 만드실수 있습니다."
      })
      return;
    } else {
      this.setState({
        errormessage: '',
      })
    }
    this.props.handleCreateAccount(this.state);
  }

  handleCreateAccount = () => {
    const { username, email, password, passwordcheck } = this.state;
    if (!username || !email || !password ) {
      this.setState({
        errormessage: "모든 항목은 필수입니다."
      })
      return;
    } else if (password !== passwordcheck) {
      this.setState({
        errormessage: "비밀번호가 서로 다릅니다."
      })
      return;
    } else if (!IsValidiateUsername(this.state.username)) {
      this.setState({
        errormessage: "유저네임은 영문 대소문자, 숫자, 언더바, 하이픈을 사용해 4글자이상 16글자 이하로 만들수 있습니다."
      })
      return;
    } else if (!IsValidiatePassword(this.state.password)) {
      this.setState({
        errormessage: "비밀번호는 최소 한 글자 이상의 영문 대소문자, 숫자, 특수문자(!, @, #, $, %, &, *) 를 포함한 8글자 이상으로 만들어야 합니다."
      })
      return;
    } else {
      this.setState({
        errormessage: '',
      })
    }

    this.props.handleCreateAccount(this.state);

    }
    
  
  render() {
    return(
      <div>
        <form id="signupComp" onSubmit={(e) => e.preventDefault()}>
          <div>
          <input 
            className="signupComp-input" 
            type="text"
            onChange={this.handleInputValue("username")} 
            placeholder="username"/>
          </div>
          { this.props.isSocialLogin ? '' 
            :    
            <div>
              <div>
                <input 
                  className="signupComp-input" 
                  onChange={this.handleInputValue("email")}
                  type="email" 
                  placeholder="email"/>
              </div>
              <div>
                <input 
                  className="signupComp-input" 
                  onChange={this.handleInputValue("password")}
                  type="password" 
                  placeholder="password"/>
              </div>
              <div>
                <input 
                  className="signupComp-input"
                  onChange={this.handleInputValue("passwordcheck")} 
                  type="password" 
                  placeholder="password-check"/>
              </div>
            </div>
          }
          <div>
            <label>{this.state.errormessage}</label>
          </div>
          <div>
            <button 
              onClick={() => {
                  if(this.props.isSocialLogin){
                    this.handleCreateSocialAccount()
                  } else {
                    this.handleCreateAccount()
                  }
                }
              }>
                Create account
            </button>
          </div>
        </form>
      </div> 
    );
  }
  
}

export default SignupComp;