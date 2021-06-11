import React from 'react';

function SignBtn(props) {
  return (
    <div className="signbtn-container">
      <button id="signBtn" onClick={props.handleStart}>
        Log In
      </button>
    </div>
  );
}

export default SignBtn;
