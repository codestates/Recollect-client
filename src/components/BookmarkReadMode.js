import React from 'react';
import { generateRandomColorPairArr } from '../util/randomColor';
import axios from 'axios';

class BookmarkReadMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseHover: false,
    };

    this.mouseHover = this.mouseHover.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
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
    const { desc, emojis, created_at, url, id } = this.props.bookmarkInfo;
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
              axios
                .put(
                  'http://recollect.today/bookmark',
                  {
                    BookmarkId: id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.props.accessToken}`,
                      withCredentials: true,
                    },
                  }
                )
                .then()
                .catch((err) => {
                  console.error(err.message);
                  // if ((err.body.message = "Not Allowed")) {
                  //   this.props.getRefreshToken();
                  // }
                });
            }}
          >
            {url}
          </div>
        ) : (
          <div className="mouseOut">
            <div> {desc} </div>
            <div>
              {emojis.map((emoji) => {
                return <span id="emoji"> {emoji} </span>;
              })}
              <div id="created_at"> {created_at} </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BookmarkReadMode;
