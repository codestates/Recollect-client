import axios from "axios";
import React from "react";
import Footer from "../components/Footer";
import BackBtn from "../components/BackBtn";
import BookMark from "../components/Bookmark";

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecollect: false,
      bookmarks: [
        {
          id: 1,
          desc: "Hello World",
          emojis: ["☕️", "⚡️"],
          url: "https://www.google.com/",
          created_at: "2021 - 06 - 08",
        },
        {
          id: 2,
          desc: "Welcome to Recollect",
          emojis: ["❓"],
          url: "https://www.google.com/",
          created_at: "2021 - 06 - 08",
        },
      ],
    };
  }

  render() {
    return (
      <div className="tempBackground">
        <div className="bookmarkContainer">
          {this.state.bookmarks.map((bookmark) => (
            <BookMark bookmarkInfo={bookmark} />
          ))}
        </div>
      </div>
    );
  }
}

export default MyPage;
