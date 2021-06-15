import React from 'react';
import axios from 'axios';

const { IsValidiatePassword } = require('../util/validiation');
class PwdPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errormessage: '',
      password: '',
      passwordcheck: '',
    };

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value }); //--> e.target.value -> password 할당
  };

  handleEditBtn() {
    console.log('edit password', this.state);
    const { password, passwordcheck } = this.state;
    if (!password) {
      this.setState({
        errormessage: '비밀번호를 입력하세요.',
      });
      return;
    } else if (password !== passwordcheck) {
      this.setState({
        errormessage: '비밀번호가 서로 다릅니다.',
      });
      return;
    } else if (!IsValidiatePassword(password)) {
      this.setState({
        errormessage:
          '비밀번호는 최소 한 글자 이상의 영문 대소문자, 숫/자, 특수문자(!, @, #, $, %, &, *) 를 포함한 8글자 이상으로 만들어야 합니다.',
      });
      return;
    } else {
      this.setState({
        errormessage: '',
      });
    }

    this.props.updateUserInfo(null, this.state.password);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <div id="popup-close-btn" onClick={this.props.handlePwdPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{this.props.text}</h1>
          <div className="popup-inner-body">
            <input
              type="password"
              placeholder="password"
              className="edit"
              onChange={this.handleInputValue('password')}
            />
            <input
              type="password"
              placeholder="password check"
              className="edit"
              onChange={this.handleInputValue('passwordcheck')}
            />
            <button onClick={this.handleEditBtn}>Change password</button>
            <div>
              <label>{this.state.errormessage}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PwdPopup;
