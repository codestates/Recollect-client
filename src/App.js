import axios from "axios";
import React from "react";
import Landing from "./page/Landing";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Mypage from "./page/Mypage";
import Recollect from "./page/Recollect";
import Profile from "./page/Profile";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

require("dotenv").config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      username: null,
      accessToken: "",
      isSocialLogin: false,
    };

    this.handleStart = this.handleStart.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.routeToSomewhere = this.routeToSomewhere.bind(this);
    this.handleGoback = this.handleGoback.bind(this);
  }

  handleStart() {
    this.props.history.push("/login"); // start/login 버튼클릭 => login으로 라우팅 //
  }

  handleGoback() {
    this.props.history.push("/mypage"); // goback버튼클릭 => maypage으로 라우팅 //
  }

  //// 홈페이지 로그인 성공시 호출메소드 ////
  loginSuccess(username) {
    this.setState({
      // 200 응답시 상태변경 //
      isLogin: true,
      username: username,
    });
    this.props.history.push("/mypage"); // login 성공 => mypage로 라우팅 //
  }
  //// 깃허브 로그인시 호출메소드 ////
  async getAccessToken(authorizationCode) {
    await axios
      .post("http://recollect.today/getToken", {
        authorizationCode: authorizationCode,
      })
      .then((res) => {
        this.setState({
          isLogin: true,
          accessToken: res.data.accessToken,
        });
        this.props.history.push("/mypage"); // login 성공 => mypage로 라우팅 //
      });
  }

  routeToSomewhere(target) {
    // console.log("target");
    this.props.history.goback();
  }

  componentDidMount() {
    //// 깃허브 인증코드 반환 ////
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) this.getAccessToken(authorizationCode);
  }

  render() {
    const { isLogin } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Landing handleStart={this.handleStart} />;
            }}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                loginSuccess={this.loginSuccess}
                routeToSomewhere={this.routeToSomewhere}
              />
            )}
          />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/mypage" render={() => <Mypage />} />
          <Route exact path="/recollect" render={() => <Recollect />} />
          <Route 
            exact 
            path="/profile" 
            render={() => (
              <Profile 
                isLogin={this.state.isLogin}
                isSocialLogin={this.state.isSocialLogin}
              />
            )} 
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
