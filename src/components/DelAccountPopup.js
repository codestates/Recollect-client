import React from "react";
import axios from "axios";

class DelAccountPopup extends React.Component {
  constructor(props){
    super(props);
    
    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
  }


handleDeleteBtn(){
    //회원 탈퇴 로직,
    axios
        .delete("https://recollect.today/profile",{
           authorization: this.props.accessToken //<- accessToken 내려받기 
        })
        .then(res => {
           //스테이트 변경로직
           //isSocialLogin: false
           //isLogin: false, //<-- DelAccountPopup <- profile <- App
           //랜딩 페이지로 리다이렉트
            this.props.history.push("/");
            console.log(res.message)
        })
        .catch(err =>
          console.log(err)
        )
    
  }

  render() {
    console.log(this.props.isLogin)
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div id="popup-close-btn" onClick={this.props.handleDelAccountPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{this.props.username},</h1>
          <div className="ask">Are you sure <br /> to delete <br /> your Recollect Account ?</div>
          <div className="popup-inner-body">
            <button onClick={this.props.handleDelAccountPopup}>
              Keep My Account
            </button>
            <button onClick={this.handleDeleteBtn}>
              Sad, but Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DelAccountPopup;