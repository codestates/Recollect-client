import React from 'react';
import axios from "axios";

class UserPopup extends React.Component {
  constructor(props){
    super(props);

    // this.handleEditBtn = this.handleEditBtn.bind(this);

  }

  render() {
    console.log(this.props);
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <div id="popup-close-btn" onClick={this.props.handleUserPopup}>
            <i className="fas fa-times"></i>
          </div>
          <h1>{this.props.text}</h1>
          <div className="popup-inner-body">
          <input 
              placeholder={this.props.username}
              className="edit"
          />
          <button>Change username</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPopup;