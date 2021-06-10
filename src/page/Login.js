import axios from "axios";
import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      GITHUB_LOGIN_URL:
        "https://github.com/login/oauth/authorize?client_id=깃허브클라이언트아이디",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //// 소셜로그인 메소드 - 시작 ////

  // 소셜로그인 페이지로 이동 메소드 //
  handleSocialLogin = () => {
    window.location.assign(this.GITHUB_LOGIN_URL);
  };

  //// 홈페이지 로그인 메소드 - 시작 ////

  // 아이디, 패스워드 입력시 state변경 메소드 //
  handleInputValue = (key) => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    //// email 또는 password가 공백상태로 제출된경우 에러메시지 ////
    if (!email || !password) {
      this.setState({
        errorMessage: "아이디와 비밀번호를 입력하세요",
      });
    } else {
      //// POST 요청 (서버 열리면 주석제거) ////
      axios
        .post("http://recollect.today/login", {
          email: email,
          password: password,
        })
        .then((res) => this.props.loginSuccess(res.data.username)) // Login요청성공시 라우팅
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="LoginContainer">
        <h1>LOGIN</h1>
        <article>
          <button className="GithubBtn" onClick={this.handleSocialLogin}>
            GitHub
          </button>
          <div>
            <div className="middleLine">OR</div>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="email"
            onChange={this.handleInputValue("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="pwd"
            onChange={this.handleInputValue("password")}
          />
          <button onClick={this.handleLogin}>Log In</button>
          <div>
            <div className="middleLine">OR</div>
          </div>
          <button>Create Account</button>

          <p className="errorMessage"> {this.state.errorMessage} </p>
        </article>
      </div>
    );
  }
}

export default Login;
