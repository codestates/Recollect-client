import axios from "axios";
import React from "react";
// import Landing from "./page/Landing";
// import Login from "./page/Login";
// import Signup from "./page/Signup";
// import Mypage from "./page/Mypage";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

require("dotenv").config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: null,
      isLogin: false,
      username: null,
    };
    this.getSomething = this.getSomething.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
  }
  getSomething() {
    console.log(`${process.env.REACT_APP_API_URL}`);
    axios
      .get(`${process.env.REACT_APP_API_URL}`)
      .then((res) => {
        this.setState({
          hello: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  //// 로그인 성공시 호출메소드 ////
  loginSuccess = (username) => {
    this.setState({
      // 200 응답시 상태변경 //
      isLogin: true,
      username: username,
    });
    this.props.history.push("/mypage"); // login 성공 => mypage로 라우팅 //
  };

  componentDidMount() {
    this.getSomething();
  }

  render() {
    return (
      <div>
        {/* <Switch>
          <Route
              path='/'
              render={() => {
                // if (isLogin) {
                //   return <Redirect to='/mypage' />;
                // }
                // return <Redirect to='/' render={() => (<Landing />)}/>;
              }}
          />
          <Route
            path='/login'
            render={() => (<Login loginSuccess = {this.loginSuccess}/>)}
          />
          <Route
            exact
            path='/signup'
            render={() => <Signup />} 
          />
          <Route
            exact
            path='/mypage'
            render={() => <Mypage />} 
          />
          <Route
            exact
            path='/recollect'
            render={() => <Recollect />} 
          />
          <Route
            exact
            path='/profile'
            render={() => <Profile />} 
          />
        </Switch> */}
      </div>
    );
  }
}

export default withRouter(App);
