import axios from 'axios';
import React from 'react';
import Landing from './page/Landing';
// import Loading from "./components/Loading"; //TEMP
import Login from './page/Login';
import Signup from './page/Signup';
import Mypage from './page/Mypage';
import Recollect from './page/Recollect';
import Profile from './page/Profile';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: '',
      socialId: '',
      isSocialLogin: true, //--> socialId로 profile 분기 변경 / 좀 더 생각해보기

      isLoading: false, //로딩용 상태값
    };

    this.loginSuccess = this.loginSuccess.bind(this);
    this.socialLoginSuccess = this.socialLoginSuccess.bind(this);

    this.getGitHubUserInfo = this.getGitHubUserInfo.bind(this);
    this.logcheck = this.logcheck.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    //this.handleUpdateUser = this.handleUpdateUser.bind(this);

    // this.getUserInfo = this.getUserInfo.bind(this);
    // this.getTheAuthenticatedUser = this.getTheAuthenticatedUser(this);

    this.handleLogOut = this.handleLogOut.bind(this);
    this.initState = this.initState.bind(this);
  }

  initState() {
    this.setState({
      isLogin: false,
      isSocialLogin: false,
      accessToken: '',
      socialId: '',
    });
    this.props.history.push('/');
  }

  handleLogOut() {
    axios
      .get('http://recollect.today/logout', {
        headers: { Authorization: `Bearer ${this.state.accessToken}` },
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
    this.setState({
      isLogin: true,
      accessToken: accessToken, //accessToken 할당
    });
    this.props.history.push('/'); // isLogin 상태값에 따라 Landing / Mypage
  }

  //// 소셜 로그인 성공시 ////
  socialLoginSuccess(res) {
    this.setState({
      isLogin: true,
      isSocialLogin: true,
      accessToken: res.headers.accessToken, //// <= 헤더에서 토큰추출하는부분 확인필요
    });
    this.props.history.push('/'); // isLogin 상태값에 따라 Landing / Mypage
  }
  //* 깃허브에서 access code를 받고 서버로 access 토큰 요청
  async getAccessToken(authorizationCode) {
    await axios
      .post(
        'http://localhost:4000/getToken',
        { authorizationCode: authorizationCode },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState({
          accessToken: res.data.data.accessToken,
        });
        this.getGitHubUserInfo();
      })
      .catch((err) => {
        //this.handleUpdateUser();
        console.error(err);
      });
  }

  //* 깃허브로 로그인 한 유저를 app에 저장/업데이트 ---> 유빈님 작성하신..뭘까요?????
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
  // async getUserInfo() {
  //   await axios
  //     .get("https://api.github.com/users/Justicexx0099", {
  //       headers: {
  //         Accept: "application/vnd.github.v3+json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log("데이터를 받아왔습니다", res);
  //       //this.logcheck(res.data.id);
  //     });
  // }

  //TODO: socialId를 저장
  //* GitHub 앱이 사용자의 액세스 토큰을 사용하여 API에 액세스
  //사용자의 액세스 토큰을 사용하면 GitHub 앱이 사용자를 대신하여 API에 요청을 할 수 있음
  getGitHubUserInfo() {
    console.log('access token ', this.state.accessToken);
    axios
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${this.state.accessToken}`, //A or a
        },
      })
      .then((res) => {
        this.setState({
          socialId: res.data.id,
        });
        console.log('데이터를 출력하겠습니다', res.data);
        this.logcheck(res.data.id);
      });
  }

  //* 로그인 사용자의 공개 프로필 정보 요청
  // async getTheAuthenticatedUser() {
  //   await axios({
  //     method: "get",
  //     url: "https://api.github.com/user",
  //     headers: {
  //       Accept: "application/vnd.github.v3+json",
  //     },
  //   }).then((res) => {
  //     console.log(res.data);
  //   });
  // }

  //* 기존 rocollect 회원인지 아닌지 판별
  logcheck(socialId) {
    axios
      .post(
        'http://localhost:4000/logcheck',
        {
          socialId: this.state.socialId,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        // login post 요청
        axios
          .post(
            'http://localhost:4000/login',
            {
              uuid: res.data.uuid,
            },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          )
          .then((res) => {
            this.socialLoginSuccess(res); // 이미 리콜렉트 소셜 회원인 경우
          });
      })
      .catch(() => {
        //신규 소셜 회원인경우
        this.props.history.push({
          pathname: '/signup',
          state: { socialId: socialId },
        });
        this.setState({
          isSocialLogin: true,
        });
      });
  }

  componentDidMount() {
    //* 깃허브 accessCode 가져옴
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
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
                loginSuccess={this.loginSuccess}
                handleLogOut={this.handleLogOut}
                history={this.props.history}
                accessToken={this.state.accessToken}
              />
            )}
          />
          <Route exact path="/recollect" render={() => <Recollect />} />
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
