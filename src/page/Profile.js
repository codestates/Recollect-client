import React from "react";
import axios from 'axios';

import BackBtn from '../components/BackBtn'
import Footer from '../components/Footer'

import UserPopup from '../components/UserPopup'
import PwdPopup from '../components/PwdPopup'
import DelAccountPopup from '../components/DelAccountPopup'
class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showUserPopup: false,
      showPwdPopup: false,
      showDelAccountPopup: false,
    }
    this.handleUserPopup = this.handleUserPopup.bind(this);
    this.handlePwdPopup = this.handlePwdPopup.bind(this);
    this.handleDelAccountPopup = this.handleDelAccountPopup.bind(this);
  }


  handleUserPopup(){
    this.setState((prevState)=>({
      showUserPopup: !prevState.showUserPopup,
    })
    )
  }

  handlePwdPopup(){
    this.setState((prevState)=>({
      showPwdPopup: !prevState.showPwdPopup,
    })
    )
  }

  handleDelAccountPopup(){
    this.setState((prevState)=>({
      showDelAccountPopup: !prevState.showDelAccountPopup,
    })
    )
  }

  render(){
    const isSocialLogin = this.props.isSocialLogin;
    const {showUserPopup, showPwdPopup, showDelAccountPopup} = this.state;
    return(
      <div className="profile-container">
        <div className="main-container">
        <BackBtn history={this.props.history} id="profile-backbtn"/>

          <h1>PROFILE</h1>
          { (isSocialLogin) 
          ? (
            <div className="profile">
              <div className="profile-header">
                <h1>{this.props.username}</h1>
                <span>-</span>
              </div>
              
              <div className="profile-btns">
              <button className="change-btn" 
                onClick={()=>{this.handleUserPopup()}}>
                Change username
              </button>
              <div className="seperating-line">OR</div>
              <button className="delete-account-btn" onClick={()=>{this.handleDelAccountPopup()}}>
                Delete Account
              </button>
              {showUserPopup 
                ? 
                <UserPopup
                  username={this.props.username}
                  handleUserPopup={this.handleUserPopup}
                />
                : null
                }
              {showDelAccountPopup 
                ? 
                <DelAccountPopup
                  history={this.props.history}
                  isLogin={this.props.isLogin}
                  username={this.props.username}
                  handleDelAccountPopup={this.handleDelAccountPopup}
                />
                : null
                }
              </div>
            </div>)
          :(
            <div className="profile">
              <div className="profile-header">
                <h1>{this.props.username}</h1> 
                <span>{this.props.email}</span>
              </div>
              
              <div className="profile-btns">
                <button className="change-btn" onClick={this.handleUserPopup}>
                  Change username
                </button>
                <button className="change-btn" onClick={this.handlePwdPopup}>
                  Change password
                </button>
                <div className="seperating-line">OR</div>
                <button className="delete-account-btn" onClick={this.handleDelAccountPopup}>
                  Delete Account
                </button>
                {showUserPopup
                  ? 
                  <UserPopup
                  username={this.props.username}
                  handleUserPopup={this.handleUserPopup}
                  />
                : null
                }
                {showPwdPopup
                ? 
                  <PwdPopup
                  password={this.props.password}
                  passwordcheck={this.props.passwordcheck}
                  handlePwdPopup={this.handlePwdPopup}
                  />
                : null
                }
                {showDelAccountPopup 
                ? 
                <DelAccountPopup
                  isLogin={this.props.isLogin}
                  username={this.props.username}
                  handleDelAccountPopup={this.handleDelAccountPopup}
                />
                : null
                }
              </div>
            
            </div>)
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default Profile;