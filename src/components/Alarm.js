import React from "react";

class Alarm extends React.Component {
  constructor(props) {
    super(props); //getRefreshToken
    this.state = {
      unreadCount: 0,
      // innerWidth: window.innerWidth,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.unreadCount !== prevProps.unreadCount) {
      this.setState({
        unreadCount: this.props.unreadCount,
      });
    }
  }

  render() {
    // window.addEventListener("resize", () => {
    //   this.setState({
    //     innerWidth: window.innerWidth,
    //   });
    // });

    // 아래 this.props.unreadCount로 테스트해보기
    const longContents = `There are ${this.state.unreadCount} Collects you haven't checked.  
    Start to Recollect !`;
    return (
      <div id="alarm">
        <div id="alarm-alert">
          <div
            onClick={() => {
              if (this.props.location === "/mypage") {
                this.props.history.push("/recollect");
              }
            }}
          >
            {longContents}
          </div>
        </div>
      </div>
    );
  }
}

export default Alarm;
