import React from "react";
//import axios from 'axios';

import BackBtn from '../components/BackBtn'
import Footer from '../components/Footer'

import UserPopup from '../components/UserPopup'
import PwdPopup from '../components/PwdPopup'
import DelAccountPopup from '../components/DelAccountPopup'
import axios from "axios";
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
    this.getProfileInfomation = this.getProfileInfomation.bind(this);
  }


  getProfileInfomation(){
    axios
      .get('http://recollect.tody/profile', 
      {
        headers: { Authorization: `Bearer ${this.props.accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        const {user} = res.data;

      })
      .catch((err) => {
        console.err(err);
      })
  }

  //유저네임변경 팝업
  handleUserPopup(){
    this.setState((prevState)=>({
      showUserPopup: !prevState.showUserPopup,
    })
    )
  }
  //패스워드변경 팝업
  handlePwdPopup(){
    this.setState((prevState)=>({
      showPwdPopup: !prevState.showPwdPopup,
    })
    )
  }
  //회원탈퇴 팝업
  handleDelAccountPopup(){
    this.setState((prevState)=>({
      showDelAccountPopup: !prevState.showDelAccountPopup,
    })
    )
  }

  componentDidMount(){
    this.getProfileInfomation();
  }

  render(){
    const {isSocialLogin} = this.props;
    const {showUserPopup, showPwdPopup, showDelAccountPopup} = this.state;
    return(
      <div className="profile-container">
        <div className="main-container">
          <div className="logo-container">
            <img src="logo.png" alt="logo" />
          </div>
          <div id="profile-backbtn-container">
            <BackBtn history={this.props.history}/>
          </div>
          
          <h1>PROFILE</h1>
          { (isSocialLogin) //////소셯회원인 경우////////
          ? ( 
            <div className="profile">
              <div className="profile-header">
                <h1>{this.props.username}</h1>
                <span>-</span>
              </div>
              <div className="profile-btns">
                <button className="change-btn" onClick={()=>{this.handleUserPopup()}}>
                  Change username
                </button>
                <div className="seperating-line">OR</div>
                <button className="delete-account-btn" onClick={()=>{this.handleDelAccountPopup()}}>
                  Delete Account
                </button>
                {showUserPopup && 
                  <UserPopup
                    username={this.props.username}
                    accessToken={this.props.accessToken}
                    handleUserPopup={this.handleUserPopup}
                  />  
                }
                {showDelAccountPopup &&
                  <DelAccountPopup
                    history={this.props.history}
                    handleDelAccountPopup={this.handleDelAccountPopup}
                    username={this.props.username}
                    accessToken={this.props.accessToken}

                  />
                }
              </div>
            </div> )

          : ( ///////자체 회원인 경우////////
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
                {showUserPopup &&
                  <UserPopup
                    username={this.props.username}
                    accessToken={this.props.accessToken}
                    handleUserPopup={this.handleUserPopup}
                  />
                }
                {showPwdPopup &&
                  <PwdPopup
                    password={this.props.password}
                    passwordcheck={this.props.passwordcheck}
                    accessToken={this.props.accessToken}
                    handlePwdPopup={this.handlePwdPopup}
                  />
                }
                {showDelAccountPopup &&
                  <DelAccountPopup
                    history={this.props.history}
                    handleDelAccountPopup={this.handleDelAccountPopup}
                    username={this.props.username}
                    accessToken={this.props.accessToken}
                  />
                }
              </div>
            </div> )
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default Profile;