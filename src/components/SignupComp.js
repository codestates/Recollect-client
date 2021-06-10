import React from "react";
import axios from 'axios';

class SignupComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordcheck: '',
      errormessage: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value});
  };

  handleCreateBtn = () => {
    const { username, email, password } = this.state;

    axios
      .post('/signup', {
        username: username,
        email: email,
        password: password,
      })
      .then(res => {
        this.props.history.push('/')
      })
      .catch( err => {
        this.setState({
          errormessage: err.response.date,
        })
      })

    }
    
  
  render() {
    return(
      <div>
        <form id="signupComp" onSubmit={(e) => e.preventDefault()}>
          <div>
          <input 
            className="signupComp-input" 
            type="text"
            onChange={this.handleInputValue("username")} 
            placeholder="username"/>
          </div>
          { this.props.isSocialLogin ? '' 
            :    
            <div>
              <div>
                <input 
                  className="signupComp-input" 
                  onChange={this.handleInputValue("email")}
                  type="email" 
                  placeholder="email"/>
              </div>
              <div>
                <input 
                  className="signupComp-input" 
                  onChange={this.handleInputValue("password")}
                  type="password" 
                  placeholder="password"/>
              </div>
              <div>
                <input 
                  className="signupComp-input"
                  onChange={this.handleInputValue("passwordcheck")} 
                  type="password" 
                  placeholder="password-check"/>
              </div>
            </div>
          }
          <div>
            <input type="checkbox" name="agreement"/>
            <label for="agreement">terms and conditions</label>
          </div>
          <div>
            <button onClick={this.handleCreateBtn}>Create account</button>
          </div>
        </form>
      </div> 
    );
  }
  
}

export default SignupComp;