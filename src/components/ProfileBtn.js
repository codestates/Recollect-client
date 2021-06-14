import React from 'react';

function ProfileBtn(props) {
  return (
    <div className="profilebtn-container">
      <button
        id="profileBtn"
        onClick={() => {
          props.history.push('/profile');
        }}
      >
        <i className="far fa-user-circle"></i>
      </button>
    </div>
  );
}

export default ProfileBtn;
