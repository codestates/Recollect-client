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
      username: "state username",
      accessToken: "",
      isSocialLogin: true,
    };

    this.handleStart = this.handleStart.bind(this);
    this.getGitHubUserInfo = this.getGitHubUserInfo.bind(this);
    this.logcheck = this.logcheck.bind(this);
  }

  handleStart() {
    this.props.history.push("/login");
  }

  //// 홈페이지 로그인 성공시 ////
  loginSuccess(accessToken) {
    this.setState({
      isLogin: true,
      accessToken: accessToken,
    });
    this.props.history.push("/mypage");
  }

  //// 깃허브 로그인시 ////
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
        this.getGitHubUserInfo();
      });
  }

  //// 깃허브에 유저정보 요청 ////
  getGitHubUserInfo() {
    let response = axios.get("https://api.github.com/user", {
      headers: {
        authorization: `token ${this.state.accessToken}`,
      },
    });
    this.logcheck(response.data.id);
  }

  //// 기존 회원인지 아닌지 판별 ////
  logcheck(socialId) {
    axios
      .post(
        "https://recollect.today/logcheck",
        {
          socialId: socialId,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.message === "recollect user")
          // login post 요청
          axios
            .post(
              "https://recollect.today/login",
              {
                uuid: res.data.uuid,
              },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then(() => this.props.history.push("/mypage"))
            .catch((err) => console.log(err));
      })
      .catch(() => {
        this.props.history.push({
          pathname: "/signup",
          state: { socialId: socialId },
        });
      });
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
      <>
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
                history={this.props.history}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                history={this.props.history}
                loginSuccess={this.loginSuccess}
              />
            )}
          />
          <Route exact path="/mypage" render={() => <Mypage />} />
          <Route exact path="/recollect" render={() => <Recollect />} />
          <Route 
            exact 
            path="/profile" 
            render={() => 
              <Profile 
                history={this.props.history}
                isLogin={this.state.isLogin}
                isSocialLogin={this.state.isSocialLogin}
                username={this.state.username}
                loginSuccess={this.loginSuccess}
              />
              } 
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
