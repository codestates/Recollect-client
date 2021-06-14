import React from 'react';
import axios from "axios";

const { IsValidiatePassword } = require('../util/validiation')
class PwdPopup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      errormessage: '',
    }

   this.handleEditBtn = this.handleEditBtn.bind(this);
   this.handleInputValue = this.handleInputValue.bind(this);
  }


  handleInputValue = (key) => (e) => {
    // this.setState({ [key]: e.target.value}); //--> e.target.value -> password 할당
  };

  handleEditBtn(){
    console.log('edit password', this.props)
    const {password, passwordcheck} = this.props;
    if(!password){
      this.setState({
        errormessage: "비밀번호를 입력하세요."
      })
      return;
    }else if(password !== passwordcheck){
      this.setState({
        errormessage: "비밀번호가 서로 다릅니다."
      })
    }
    if(!IsValidiatePassword(password)){
      //validation check --> show error message
    }

    axios.patch('http://recollect.today/profile', 
      {
        password: this.props.password, //api username required 수정 / 혹은 팝업 로직 변경 필요
      },
      {
        headers: { Authorization: this.props.accessToken }
      }
    )
    .then((res)=>{
      // console.log(res)
      //password state 변경 메소드 
    })
    .catch((err) => {
      console.log(err); //fail to edit 501
    })
  }


  render() {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div id="popup-close-btn" onClick={this.props.handlePwdPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{this.props.text}</h1>
          <div className="popup-inner-body">
          <input 
              placeholder="password"
              className="edit"
              onChange={()=> this.handleInputValue("password")}
          />
          <input 
              placeholder="password check"
              className="edit"
              onChange={() => this.handleInputValue("passwordcheck")}
          /> 
            <button onClick={this.handleEditBtn}>
              Change password
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PwdPopup;