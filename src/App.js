import axios from "axios";
import React from "react";
import Landing from "./page/Landing";
// import Loading from "./components/Loading"; //TEMP
import Login from "./page/Login";
import Signup from "./page/Signup";
import Mypage from "./page/Mypage";
import Recollect from "./page/Recollect";
import Profile from "./page/Profile";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

require("dotenv").config();
//** *//
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: "",
      socialId: "",
      isSocialLogin: true, //--> socialId로 profile 분기 변경 / 좀 더 생각해보기
      unreadBookmarks: [],
      isLoading: false, //로딩용 상태값
    };

    this.loginSuccess = this.loginSuccess.bind(this);
    this.socialLoginSuccess = this.socialLoginSuccess.bind(this);

    this.getGitHubUserInfo = this.getGitHubUserInfo.bind(this);
    this.logcheck = this.logcheck.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);

    this.handleLogOut = this.handleLogOut.bind(this);
    this.initState = this.initState.bind(this);
    this.moveUnreadBookmarks = this.moveUnreadBookmarks.bind(this);
  }

  initState() {
    this.setState({
      isLogin: false,
      isSocialLogin: false,
      accessToken: "",
      socialId: "",
    });
    this.props.history.push("/");
  }

  handleLogOut() {
    axios
      .get("https://localhost:4000/logout", {
        headers: { Authorization: `${this.state.accessToken}` },
        withCredentials: true
      })
      .then(() => {
        this.initState();
      })
      .catch((err) => {
        console.log(err);
        this.initState();
      });
  }

  //// 자체 로그인 성공시 ////
  loginSuccess(accessToken) {
    console.log(accessToken);
    this.setState({
      isLogin: true,
      accessToken: accessToken, //accessToken 할당
    });
    this.props.history.push("/"); // isLogin 상태값에 따라 Landing / Mypage
  }

  //// 소셜 로그인 성공시 ////
  socialLoginSuccess(res) {
    console.log(res);
    this.setState({
      isLogin: true,
      isSocialLogin: true,
      accessToken: res.headers.authorization, //// <= 헤더에서 토큰추출하는부분 확인필요
    });
    this.props.history.push("/"); // isLogin 상태값에 따라 Landing / Mypage
  }
  //* 깃허브에서 access code를 받고 서버로 access 토큰 요청
  async getAccessToken(authorizationCode) {
    await axios
      .post(
        "https://localhost:4000/getToken",
        { authorizationCode: authorizationCode },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          accessToken: res.data.data,
        });
        this.getGitHubUserInfo();
      })
      .catch((err) => {
        //this.handleUpdateUser();
        console.error(err);
      });
  }

  getRefreshToken() {
    axios
      .get("https://localhost:4000/getrefreshtoken", {
        withCredentials: true,
      })
      .then((res) => {
        this.loginSuccess(res.data.accessToken);
      })
      .catch((err) => {
        //로그아웃 시키기
        // islogin, isSociallogin false 로 만들어주고 socialId지워주고 세션 파괴
        console.error(err);
      });
  }

  //TODO: socialId를 저장
  //* GitHub 앱이 사용자의 액세스 토큰을 사용하여 API에 액세스
  //사용자의 액세스 토큰을 사용하면 GitHub 앱이 사용자를 대신하여 API에 요청을 할 수 있음
  getGitHubUserInfo() {
    console.log("access token ", this.state.accessToken);
    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${this.state.accessToken}`, //A or a
        },
      })
      .then((res) => {
        this.setState({
          socialId: res.data.id,
        });
        console.log("데이터를 출력하겠습니다", res.data);
        this.logcheck(res.data.id);
      });
  }

  //* 기존 rocollect 회원인지 아닌지 판별
  logcheck(socialId) {
    axios
      .post(
        "https://localhost:4000/logcheck",
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
        // login post 요청
        axios
          .post(
            "https://localhost:4000/login",
            {
              uuid: res.data.uuid,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((res) => {
            this.socialLoginSuccess(res); // 이미 리콜렉트 소셜 회원인 경우
          });
      })
      .catch((err) => {
        //신규 소셜 회원인경우
        if (err.response.status === 404) {
          this.props.history.push({
            pathname: "/signup",
            state: { socialId: socialId },
          });
          this.setState({
            isSocialLogin: true,
          });
        } else {
          console.error(err);
        }
      });
  }

  moveUnreadBookmarks(bookmarks) {
    this.setState({
      unreadBookmarks: bookmarks,
    });
  }

  componentDidMount() {
    //* 깃허브 accessCode 가져옴
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) this.getAccessToken(authorizationCode);
  }

  render() {
    const { isLogin } = this.state;

    return (
      <>
        <Switch>
          {/* <Route><Loading /></Route> */}
          <Route
            exact
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Landing history={this.props.history} />;
            }}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                loginSuccess={this.loginSuccess}
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
                socialLoginSuccess={this.socialLoginSuccess}
              />
            )}
          />
          <Route
            exact
            path="/mypage"
            render={() => (
              <Mypage
                moveUnreadBookmarks={this.moveUnreadBookmarks}
                loginSuccess={this.loginSuccess}
                handleLogOut={this.handleLogOut}
                history={this.props.history}
                accessToken={this.state.accessToken}
                getRefreshToken={this.getRefreshToken}
              />
            )}
          />
          <Route
            exact
            path="/recollect"
            render={() => (
              <Recollect
                unreadBookmarks={this.state.unreadBookmarks}
                history={this.props.history}
                accessToken={this.state.accessToken}
                getRefreshToken={this.getRefreshToken}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile
                history={this.props.history}
                isLogin={this.state.isLogin}
                isSocialLogin={this.state.isSocialLogin}
                accessToken={this.state.accessToken}
                initState={this.initState}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
