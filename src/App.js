import axios from "axios"
import React from "react"
// import Landing from "./page/Landing";
// import Login from "./page/Login";
// import Signup from "./page/Signup";
// import Mypage from "./page/Mypage";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

require("dotenv").config()



class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      hello: null,
    }
    this.getSomething = this.getSomething.bind(this)
  }
  getSomething() {  
    console.log(`${process.env.REACT_APP_API_URL}`)
    axios
      .get(`${process.env.REACT_APP_API_URL}`)
      .then(res => {  
        this.setState({
          hello: res.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getSomething()
  }

  render() { 
    return(
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
            render={() => (<Login />)}
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