import axios from "axios";
import React from "react";
import Footer from "../components/Footer";
import BackBtn from "../components/BackBtn";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      GITHUB_LOGIN_URL: `https://github.com/login/oauth/authorize?client_id=749cea90f0ee8535f1fa`,
      //clientid가 시윤님껄로 해도 되는지? 서버 켜서 확인
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // 소셜로그인 페이지로 이동 //
  handleSocialLogin = () => {
    window.location.assign(this.state.GITHUB_LOGIN_URL);
  };

  // 아이디, 패스워드 입력시 state변경 //
  handleInputValue = (key) => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    //// email 또는 password가 공백상태로 제출된경우 에러 ////
    if (!email || !password) {
      this.setState({
        errorMessage: "아이디와 비밀번호를 확인해주세요",
      });
    } else {
      //// POST 요청 (서버 열리면 주석제거) ////
      axios
        .post(
          "http://recollect.today/login",
          {
            email: email,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => this.props.loginSuccess(res.data.accessToken)) // Login요청 성공
        .catch(() => {
          this.setState({
            errorMessage: "아이디와 비밀번호를 확인해주세요",
          });
        });
    }
  };

  render() {
    return (
      <div className="LoginContainer">
        <div className="mainContainer">
          <div id="login-backbtn-container">
            <BackBtn history={this.props.history} />
          </div>
          <h1>LOGIN</h1>
          <article>
            <div className="logo-container">
              {/* <div className="logo-container">
                <img src="logo.png" alt="logo" />
              </div> */}
              <div id="login-logo-wrap">
                <img src="logo.png" alt="logo" />
              </div>
            </div>
            <button id="GithubBtn" onClick={this.handleSocialLogin}>
              GitHub
            </button>
            <div>
              <div className="seperatingLine">OR</div>
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
              <div className="seperatingLine">OR</div>
            </div>
            <button
              onClick={() => {
                this.props.history.push("/signup");
              }}
            >
              Create Account
            </button>

            <p className="LoginerrorMessage"> {this.state.errorMessage} </p>
          </article>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
