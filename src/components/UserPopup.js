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
    const {username} = this.props.username;
    if(!username){
      //patch 요청 보내지 않음. insufficient info
    }
    if(!IsValidiateUsername(username)){
      //validation check --> show error message
    }

    axios.patch('http://recollect.today/profile', 
      {
        username: this.props.username,
      },
      {
        headers: { Authorization: this.props.accessToken }
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