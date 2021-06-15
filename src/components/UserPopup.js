import React from 'react';
import axios from "axios";

const { IsValidiateUsername } = require('../util/validiation')
class UserPopup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      errormessage: '',
    }

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
  }


  handleInputValue = (key) => (e) => {
    // this.setState({ [key]: e.target.value}); //--> e.target.value -> username 할당
  };

  handleEditBtn(){
    console.log('edit username')
    const {username} = this.props;
    if(!username){ //input value 없을 때
      this.setState({
        errormessage: "유저네임을 입력하세요."//patch 요청 보내지 않음. insufficient info
      })
      return;
    } else if(!IsValidiateUsername(username)){
      this.setState({
        errormessage: "유저네임은 영문 대소문자, 숫자, 언더바, 하이픈을 사용해 4글자이상 16글자 이하로 만들수 있습니다."
      })
      return;
    }

    axios.patch('http://recollect.today/profile', 
      {
        username: this.props.username,
      },
      {
        headers: { Authorization: `Bearer ${this.props.accessToken}` }
      }
    )
    .then((res)=>{
      // console.log(res)
      //username state 변경 메소드 
    })
    .catch((err) => {
      console.log(err); //fail to edit 501
    })
  }

  render() {
    //console.log(this.props.username);
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div id="popup-close-btn" onClick={this.props.handleUserPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{this.props.text}</h1>
          <div className="popup-inner-body">
          <input 
              className="edit"
              placeholder={this.props.username}
              onChange={this.handleInputValue("username")}
          />
          <div>
            <label>{this.state.errormessage}</label>
          </div>
          <button onClick={this.handleEditBtn}>
            Change username
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPopup;