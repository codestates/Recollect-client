import React from "react";
import axios from 'axios';

import ProfileComp from '../components/ProfileComp'
import Footer from '../components/Footer'
class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: 'username',
      email: 'recollect@gmail.com',
      password: '',
      isSocialLogin: true,
    }

    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
  }

  handleDeleteBtn = () => {
    // axios.get(){

  }

  render(){
    const {isSocialLogin} = this.state
    return(
      <div className="profile-container">
        {/*<Back/> -> '/mypage' */}
        <div><button>temp-back-btn</button></div> 
        <div className="profile-view-container">
          <h1>Profile</h1>
          { (isSocialLogin) 
          ? (
            <div className="social-profile-view">
              
              <div className="profile-header">
                <h1>{this.state.username}</h1>
                <span>-</span>
              </div>
              
              <button className="change-btn">Change username</button>
              <button className="delete-account-btn">Delete Account</button>

            </div>)
          :(
            <div className="profile-view">
              
              <div className="profile-header">
                <h1>{this.state.username}</h1>
                <span>{this.state.email}</span>
              </div>
              
              <div><button className="change-btn">Change username</button></div>
              <div><button className="change-btn">Change password</button></div>
              <div><button className="delete-account-btn" onClick>Delete Account</button></div>
            
            </div>)
          }
          
        </div>
        <Footer />
      </div>
    )
  }
}

export default Profile;