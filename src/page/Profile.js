import React from "react";
import axios from 'axios';

import ProfileComp from '../components/ProfileComp'
import BackBtn from '../components/BackBtn'
import Footer from '../components/Footer'
class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: 'username',
      email: 'recollect@gmail.com',
      password: '',
    }

    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
  }

  handleDeleteBtn = () => {
    // axios.delete(){

  }

  render(){
    const isSocialLogin = this.props.isSocialLogin
    return(
      <div className="profile-container">
        <div className="main-container">
          <BackBtn />
          <h1>PROFILE</h1>
          { (isSocialLogin) 
          ? (
            <div className="profile">
              
              <div className="profile-header">
                <h1>{this.state.username}</h1>
                <span>-</span>
              </div>
              
              <div className="profile-btns">
              <button className="change-btn">Change username</button>
              <div className="seperating-line">OR</div>
              <button className="delete-account-btn" onClick>Delete Account</button>
              </div>
            </div>)
          :(
            <div className="profile">
              
              <div className="profile-header">
                <h1>{this.state.username}</h1>
                <span>{this.state.email}</span>
              </div>
              
              <div className="profile-btns">
                <button className="change-btn">Change username</button>
                <button className="change-btn">Change password</button>
                <div className="seperating-line">OR</div>
                <button className="delete-account-btn" onClick>Delete Account</button>
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