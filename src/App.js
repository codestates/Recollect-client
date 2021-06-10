import axios from "axios"
import React from "react"
import Landing from "./page/Landing";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Mypage from "./page/Mypage";
import Recollect from "./page/Recollect";
import Profile from "./page/Profile";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

require("dotenv").config()



class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      isLogin: false,
      username: null,
    }

    this.loginSuccess = this.loginSuccess.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart(){
    this.props.history.push('/login')
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

  render() { 
    const { isLogin } = this.state;

    return(
      <div>
        <Switch>
          <Route
              exact
              path='/'
              render={() => {
                if(isLogin){
                  return <Redirect to='/mypage' />
                }
                return <Landing handleStart={this.handleStart}/>;}}
          />
          <Route
            exact
            path='/login'
            render={() => (<Login loginSuccess={this.loginSuccess}/>)}
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);