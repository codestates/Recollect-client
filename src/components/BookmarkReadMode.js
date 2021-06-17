import React from "react";
import { generateRandomColorPairArr } from "../util/randomColor";
import axios from "axios";

class BookmarkReadMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseHover: false,
    };

    this.mouseHover = this.mouseHover.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.incrementCount = this.incrementCount.bind(this);
  }

  incrementCount() {
    console.log(this.props.bookmarkInfo);
    // axios
    //   .put(
    //     "https://localhost:4000/bookmark",
    //     {
    //       bookmarkId: this.props.bookmarkInfo.id,
    //     },
    //     {
    //       headers: {
    //         Authorization: `${this.props.accessToken}`,
    //         withCredentials: true,
    //       },
    //     }
    //   )
    //   .then(() => {
    //     this.props.getMypageInformation();
    //   })
    //   .catch((err) => {
    //     console.error(err.message);
    //     if ((err.message = "Not Allowed")) {
    //       this.props.getRefreshToken();
    //     }
    //   });
  }

  mouseHover() {
    this.setState({
      isMouseHover: true,
    });
  }
  mouseOut() {
    this.setState({
      isMouseHover: false,
    });
  }

  render() {
    const { descrip, icon, createdAt, url } = this.props.bookmarkInfo;
    const { backgroundColor, textColor } = this.props.color;
    return (
      <div
        className="bookmark"
        onMouseOver={this.mouseHover}
        onMouseOut={this.mouseOut}
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        {this.state.isMouseHover ? (
          <div
            className="mouseHover"
            onClick={() => {
              window.open(url);
              this.incrementCount();
            }}
          >
            {url}
          </div>
        ) : (
          <div className="mouseOut">
            <div> {descrip} </div>
            <div>
              {icon}
              {/* {emojis.map((emoji) => {
                return <span id="emoji"> {emoji} </span>;
              })} */}
              <div id="created_at"> {createdAt} </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BookmarkReadMode;
