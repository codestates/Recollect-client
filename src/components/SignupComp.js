import React, { Component } from "react";
import axios from 'axios';

class SignupComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.handleInputValue = this.handleCreateBtn.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value});
  };

  handleCreateBtn = () => {
    // axios.post(){

    }
    
  
  redner() {
    return(
      <div id="signupComp">
        <div>
        <input className="signupComp-input" placeholder="username"/>
        </div>
        {/* { isSocialLogin ? '' 
          :    
          <div>
            <div>
              <input className="signupComp-input" type="email" placeholder="email"/>
            </div>
            <div>
              <input className="signupComp-input" type="password" placeholder="password"/>
            </div>
            <div>
              <input className="signupComp-input" type="password" placeholder="password-check"/>
            </div>
          </div>
        } */}
        <div>
          <input type="checkbox" name="agree"/>
          <label for="agree">terms and conditions</label>
        </div>
        <div>
          <button>Create account</button>
        </div>
      </div> 
    );
  }
  
}

export default SignupComp;