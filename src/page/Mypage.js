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
          url: "https://www.github.com/",
          created_at: "2021 - 06 - 08",
        },
        {
          id: 1,
          desc:
            "어제 새벽 4시에 잠들었다. 오늘 9시 30분에 일어났다. 일어나서 샐러드와 계란후라이를 먹고, ",
          emojis: ["☕️", "⚡️"],
          url: "https://www.google.com/",
          created_at: "2021 - 06 - 08",
        },
        {
          id: 2,
          desc: "Welcome to Recollect",
          emojis: ["❓"],
          url: "https://www.github.com/",
          created_at: "2021 - 06 - 08",
        },
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
          url: "https://www.github.com/",
          created_at: "2021 - 06 - 08",
        },
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
          url: "https://www.github.com/",
          created_at: "2021 - 06 - 08",
        },
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
          url: "https://www.github.com/",
          created_at: "2021 - 06 - 08",
        },
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
          url: "https://www.github.com/",
          created_at: "2021 - 06 - 08",
        },
      ],
    };
  }

  render() {
    return (
      <div className="tempBackground">
        <div className="collection">
          <div className="bookmarkContainer">
            {this.state.bookmarks.map((bookmark) => (
              <BookMark key={bookmark.id} bookmarkInfo={bookmark} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage;
