import React from 'react';
import axios from "axios";

class PwdPopup extends React.Component {
  constructor(props){
    super(props);

    // this.handleEditBtn = this.handleEditBtn.bind(this);
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
              onChange
          />
          <input 
              placeholder="password check"
              className="edit"
              onChange
          /> 
            <button>Change password</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PwdPopup;