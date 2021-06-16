import React from "react";
//import axios from 'axios';

import BackBtn from "../components/BackBtn";
import Footer from "../components/Footer";

import UserPopup from "../components/UserPopup";
import PwdPopup from "../components/PwdPopup";
import DelAccountPopup from "../components/DelAccountPopup";
import axios from "axios";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "collector",
      email: "collector@recollect.today",
      showUserPopup: false,
      showPwdPopup: false,
      showDelAccountPopup: false,
    };
    this.handleUserPopup = this.handleUserPopup.bind(this);
    this.handlePwdPopup = this.handlePwdPopup.bind(this);
    this.handleDelAccountPopup = this.handleDelAccountPopup.bind(this);
    this.getProfileInfomation = this.getProfileInfomation.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  updateUserInfo(changingUsername, password) {
    if (!password) {
      axios
        .patch(
          "https://localhost:4000/profile",
          {
            username: changingUsername,
          },
          {
            headers: { Authorization: `Bearer ${this.props.accessToken}` },
            withCredentials: true,
          }
        )
        .then(() => {
          this.getProfileInfomation();
        })
        .catch((err) => {
          console.error(err.message); //fail to edit 501
        });
      return;
    }

    axios
      .patch(
        "https://localhost:4000/profile",
        {
          username: this.state.username,
          password: password,
        },
        {
          headers: { Authorization: `Bearer ${this.props.accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        this.getProfileInfomation();
      })
      .catch((err) => {
        console.error(err.message); //fail to edit 501
      });
  }

  getProfileInfomation() {
    axios
      .get("https://localhost:4000/profile", {
        headers: { Authorization: `Bearer ${this.props.accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        // 꼭 확인 해봐야 합니다.
        this.setState({
          username: res.data.user.user.username,
          email: res.data.user.user.email,
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  //유저네임변경 팝업
  handleUserPopup() {
    this.setState((prevState) => ({
      showUserPopup: !prevState.showUserPopup,
    }));
  }
  //패스워드변경 팝업
  handlePwdPopup() {
    this.setState((prevState) => ({
      showPwdPopup: !prevState.showPwdPopup,
    }));
  }
  //회원탈퇴 팝업
  handleDelAccountPopup() {
    this.setState((prevState) => ({
      showDelAccountPopup: !prevState.showDelAccountPopup,
    }));
  }

  componentDidMount() {
    this.getProfileInfomation();
  }

  render() {
    const { isSocialLogin } = this.props;
    const { showUserPopup, showPwdPopup, showDelAccountPopup } = this.state;
    return (
      <div className="profile-container">
        <div className="main-container">
          <div id="profile-backbtn-container">
            <BackBtn history={this.props.history} />
          </div>

          <h1>PROFILE</h1>
          {isSocialLogin ? ( //////소셯회원인 경우////////
            <div className="profile">
              <div className="logo-container">
                <img src="logo.png" alt="logo" />
              </div>
              <div className="profile-header">
                <h1>{this.state.username}</h1>
                <span>-</span>
              </div>
              <div className="profile-btns">
                <button
                  className="change-btn"
                  onClick={() => {
                    this.handleUserPopup();
                  }}
                >
                  Change username
                </button>
                <div className="seperating-line">OR</div>
                <button
                  className="delete-account-btn"
                  onClick={() => {
                    this.handleDelAccountPopup();
                  }}
                >
                  Delete Account
                </button>
                {showUserPopup && (
                  <UserPopup
                    username={this.state.username}
                    accessToken={this.props.accessToken}
                    handleUserPopup={this.handleUserPopup}
                    updateUserInfo={this.updateUserInfo}
                  />
                )}
                {showDelAccountPopup && (
                  <DelAccountPopup
                    history={this.props.history}
                    handleDelAccountPopup={this.handleDelAccountPopup}
                    username={this.state.username}
                    accessToken={this.props.accessToken}
                    initState={this.props.initState}
                  />
                )}
              </div>
            </div>
          ) : (
            ///////자체 회원인 경우////////
            <div className="profile">
              <div className="logo-container">
                <img src="logo.png" alt="logo" />
              </div>
              <div className="profile-header">
                <h1>{this.state.username}</h1>
                <span>{this.state.email}</span>
              </div>
              <div className="profile-btns">
                <button className="change-btn" onClick={this.handleUserPopup}>
                  Change username
                </button>
                <button className="change-btn" onClick={this.handlePwdPopup}>
                  Change password
                </button>
                <div className="seperating-line">OR</div>
                <button
                  className="delete-account-btn"
                  onClick={this.handleDelAccountPopup}
                >
                  Delete Account
                </button>
                {showUserPopup && (
                  <UserPopup
                    username={this.state.username}
                    accessToken={this.props.accessToken}
                    handleUserPopup={this.handleUserPopup}
                    updateUserInfo={this.updateUserInfo}
                  />
                )}
                {showPwdPopup && (
                  <PwdPopup
                    accessToken={this.props.accessToken}
                    handlePwdPopup={this.handlePwdPopup}
                    updateUserInfo={this.state.updateUserInfo}
                  />
                )}
                {showDelAccountPopup && (
                  <DelAccountPopup
                    history={this.props.history}
                    handleDelAccountPopup={this.handleDelAccountPopup}
                    username={this.state.username}
                    accessToken={this.props.accessToken}
                    initState={this.props.initState}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
