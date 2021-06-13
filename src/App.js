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

// axios.defaults.headers.common['Authorization'] = this.state.accessToken;

// export default axios.create({
//   baseURL,
//   headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `token ${this.state.accessToken}`,
//   }
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      username: "state username",
      accessToken: "",
      socialId: "",
      isSocialLogin: true,
    };
    this.handleStart = this.handleStart.bind(this);
    this.getGitHubUserInfo = this.getGitHubUserInfo.bind(this);
    this.logcheck = this.logcheck.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    //this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getTheAuthenticatedUser = this.getTheAuthenticatedUser(this);
  }


  handleStart() {
    this.props.history.push("/login");
  }

  //* 홈페이지 로그인 성공시 ////
  loginSuccess(accessToken) {
    this.setState({
      isLogin: true,
      //accessToken: accessToken,
    });
    this.props.history.push("/mypage");
  }

  //* 깃허브에서 access code를 받고 서버로 access 토큰 요청
  async getAccessToken(authorizationCode) {
    await axios({
      method: 'post',
      url: 'process.env.REACT_APP_API_URI/getToken',
      data: {
        authorizationCode: authorizationCode
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.data);
      this.setState({
        accessToken: res.data.data.accessToken
      });
      console.log(this.state.accessToken);
      this.getUserInfo();
      this.getGitHubUserInfo();
    }).catch((err) => {
      this.handleUpdateUser();
      console.error(err);
    })
  }

  //* 깃허브로 로그인 한 유저를 app에 저장/업데이트 
  // async handleUpdateUser() {
  //   await axios({
  //     method: 'patch',
  //     url: 'https://api.github.com/user',
  //     data: {
  //       name: 'Justicexx0099',
  //       email: 'mjustin9709@gmail.com'
  //     },
  //     headers: {
  //       'Accept': 'application/vnd.github.v3+json',
  //     }
  //   })
  //   .then((res) => {
  //     console.log('패치를 하였습니다',res.data);
  //   })
  // }

  //* 깃허브에 유저정보 요청
  async getUserInfo() {
    await axios.get("https://api.github.com/users/Justicexx0099", {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    .then((res) => {
      console.log('데이터를 받아왔습니다',res);
      //this.logcheck(res.data.id);
    })
  }

    //TODO: socialId를 저장
    //* GitHub 앱이 사용자의 액세스 토큰을 사용하여 API에 액세스
    //사용자의 액세스 토큰을 사용하면 GitHub 앱이 사용자를 대신하여 API에 요청을 할 수 있음
    getGitHubUserInfo() {
    axios.get("https://api.github.com/user", {
      headers: {
        'Authorization': `token ${this.state.accessToken}`,
      }
    })
    .then((res) => {
      this.setState({
        socialId: res.data.id
      });
      console.log('데이터를 출력하겠습니다',res.data);
      this.logcheck(res.data.id);
    })
  }

  //* 로그인 사용자의 공개 프로필 정보 요청
  async getTheAuthenticatedUser() {
    await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
    .then((res) => {
      console.log(res.data)
    })
  }

  //* 기존 회원인지 아닌지 판별 
  logcheck(socialId) {
    axios
      .post(
        'process.env.REACT_APP_API_URI/logcheck',
        {
          socialId: this.state.socialId,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "recollect user")
          // login post 요청
          axios
            .post(
              "process.env.REACT_APP_API_URI/login",
              {
                uuid: res.data.uuid,
              },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then(() => {
              this.setState({
                isLogin: true
              });
              this.props.history.push("/")
            })
            .catch((err) => {
              this.props.history.push("/mypage");
            })
      })
      .catch(() => {
        this.props.history.push({
          pathname: "/signup",
          state: { socialId: socialId },
        });
      });
  }

  componentDidMount() {
    //* 깃허브 accessCode 가져옴
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log(authorizationCode);
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
