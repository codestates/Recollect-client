import axios from "axios";
import React from "react";
import Footer from "../components/Footer";
import BackBtn from "../components/BackBtn";
import SignOutBtn from "../components/SignOutBtn";
import ProfileBtn from "../components/ProfileBtn";
import Alarm from "../components/Alarm";
import BookmarkReadMode from "../components/BookmarkReadMode";
import CollectionEditor from "../components/CollectionEditor";
import ScrollToTop from "../components/ScrollToTop";
const { setRandomColor } = require("../util/randomColor");

class Recollect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      bookmark: [
        {
          id: 1,
          url: "google.com",
          icon: "🤢🤢🤢",
          descrip: "hi",
          createdAt: "2021",
        },
      ],
    };
  }

  componentDidMount() {
    // this.setState({
    //   bookmark: this.props.unreadBookmarks,
    // });
  }

  render() {
    console.log(this.props.moveUnreadBookmarks);
    return (
      <div className="recollect-container">
        <div className="nav upper">
          <SignOutBtn handleLogOut={this.props.handleLogOut} />
          <ProfileBtn history={this.props.history} />
        </div>
        <div id="recollect-backbtn-container">
          <BackBtn history={this.props.history} />
        </div>
        <div className="logo-container">
          <img src="logo.png" alt="logo" />
        </div>
        <Alarm
          history={this.props.history}
          location={this.props.history.location.pathname}
        />
        <div className="nav lower"></div>
        <div className="bookmarkContainer">
          {this.state.bookmark.map((bookmark) => (
            <BookmarkReadMode
              key={bookmark.id}
              getRefreshToken={this.props.getRefreshToken}
              bookmarkInfo={bookmark}
              color={setRandomColor()}
            />
          ))}
        </div>
        <ScrollToTop />
        <Footer />
      </div>
    );
  }
}

export default Recollect;
