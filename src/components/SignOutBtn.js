import React from 'react';
import axios from 'axios';

function SignOutBtn(props) {
  const { handleLogOut } = props;

  return (
    <div className="signbtn-container">
      <button id="signBtn" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

export default SignOutBtn;
