import React from "react";

class Bookmark extends React.Component {
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
    const { id, desc, emojis, created_at, url } = this.props.bookmarkInfo;

    return (
      <div
        className="bookmark"
        onMouseOver={this.mouseHover}
        onMouseOut={this.mouseOut}
      >
        {this.state.isMouseHover ? (
          <div
            className="mouseHover"
            onClick={() => {
              window.open(url);
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

export default Bookmark;
