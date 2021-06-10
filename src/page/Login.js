import axios from "axios";
import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //// 아이디, 패스워드 입력시 상태변화 ////
  handleInputValue = (key) => (e) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleLogin = () => {
    const email = this.state.email;
    const pwd = this.state.password;

    //// email 또는 password가 공백상태로 제출된경우 에러메시지 ////
    if (!email || !pwd) {
      this.setState({
        errorMessage: "아이디와 비밀번호를 입력하세요",
      });
    }
    //// POST 요청 (서버 열리면 주석제거) ////
    // axios
    //   .post("http://", { email: email, password: pwd })
    //   .then((res) => console.log(res)) // app.js에서 받은 props함수호출 ( 함수 호출 => isLogin 상태변경 => user정보 GET요청 => MyPage )
    //   .catch((err) => console.log(err));
  };

  componentDidUpdate() {}

  render() {
    return (
      <div className="LoginContainer">
        <h1>LOGIN</h1>
        <article>
          <button className="GithubBtn">GitHub</button>
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
