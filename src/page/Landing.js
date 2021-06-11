import React from "react";
import Footer from "../components/Footer";
import SignBtn from "../components/SignBtn";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing-container">
        <SignBtn handleStart={this.props.handleStart}/>
        <div className="main-container">
          <div className="main">
            <div className="logo-container">
              <div className="logosample"></div>
              Recollect
            </div>
            <div className="intro">
              늘어만가는 수많은 북마크, 정리해보겠다고 만든 북마크 폴더들...{" "}
              <br />
              혹시 읽지 않은 북마크들이 쌓여만 가고 있진 않으신가요? <br />
              걱정하지마세요. 나만의 설명을 덧붙인 북마크를 콜렉션에 담아
              간직하세요. <br />
              읽지 않은 북마크들은 알림을 통해 Recollect하실 수 있습니다!
            </div>
            <button id="start-btn" onClick={this.props.handleStart}>
              Start
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Landing;
