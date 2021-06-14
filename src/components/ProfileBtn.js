import React from 'react';

function ProfileBtn(props) {
  return (
    <div className="signbtn-container">
      <button id="signBtn" onClick={props.handleProfileBtn}>
        Profile
      </button>
    </div>
  );
}

export default ProfileBtn;
