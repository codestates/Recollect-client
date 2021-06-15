import React from 'react';
import axios from 'axios';

class DelAccountPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errormessage: '',
    };
    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
  }

  handleDeleteBtn() {
    console.log('delete click');
    //회원 탈퇴
    axios
      .delete('http://recollect.today/profile', {
        headers: { Authorization: `Bearer ${this.props.accessToken}` },
      })
      .then(() => {
        this.props.initState();
      })
      .catch((err) => {
        //탈퇴 실패시,
        if (err) {
          this.setState({
            errormessage: err.message,
          });
        }
      });
  }

  render() {
    console.log(this.props);
    const { username, handleDelAccountPopup } = this.props;
    return (
      <div className="popup">
        <div className="popup-inner">
          <div id="popup-close-btn" onClick={this.props.handleDelAccountPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{username},</h1>
          <div className="ask">
            Are you sure <br /> to delete <br /> your Recollect Account ?
          </div>
          <div className="popup-inner-body">
            <button onClick={handleDelAccountPopup}>Keep My Account</button>
            <button onClick={this.handleDeleteBtn}>
              Sad, but Delete Account
            </button>
            <div>
              <label>{this.state.errormessage}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DelAccountPopup;
