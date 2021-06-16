import React from 'react';

const { IsValidiateUsername } = require('../util/validiation');
class UserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errormessage: '',
      changingUsername: '',
    };

    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value }); //--> e.target.value -> username 할당
  };

  handleEditBtn() {
    console.log('edit username');
    const { changingUsername } = this.state;
    if (!changingUsername) {
      //input value 없을 때
      this.setState({
        errormessage: '유저네임을 입력하세요.', //patch 요청 보내지 않음. insufficient info
      });
      return;
    } else if (!IsValidiateUsername(changingUsername)) {
      this.setState({
        errormessage:
          '유저네임은 영문 대소문자, 숫자, 언더바, 하이픈을 사용해 4글자이상 16글자 이하로 만들수 있습니다.',
      });
      return;
    } else {
      this.setState({
        errormessage: '',
      });
    }

    this.props.updateUserInfo(changingUsername);
  }

  render() {
    //console.log(this.props.username);
    return (
      <div className="popup">
        <div className="popup-inner">
          <div id="popup-close-btn" onClick={this.props.handleUserPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{this.props.text}</h1>
          <div className="popup-inner-body">
            <input
              className="edit"
              placeholder={this.props.username}
              onChange={this.handleInputValue('changingUsername')}
            />
            <button onClick={this.handleEditBtn}>Change username</button>
            <div>
              <label>{this.state.errormessage}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPopup;
