import axios from "axios";
import React from "react";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

require("dotenv").config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: null,
    };
    this.getSomething = this.getSomething.bind(this);
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

  componentDidMount() {
    this.getSomething();
  }

  render() {
    return <div>hello world!</div>;
  }
}

export default withRouter(App);
