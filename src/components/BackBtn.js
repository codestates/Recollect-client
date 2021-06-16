import React from "react";

class BackBtn extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div
        id="backBtn"
        onClick={() => {
          this.props.history.goBack();
          // props.routeToSomewhere();
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </div>
    );
  }
}

export default BackBtn;
