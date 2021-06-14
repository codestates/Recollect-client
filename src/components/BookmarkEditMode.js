import React from "react";

class BookmarkEditMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { desc, emojis, created_at, url } = this.props.bookmarkInfo;

    return (
      <div className="bookmarkEditContatiner">
        <div
          className="bookmarkWidthEdit"
          onClick={() => {
            this.props.editBookmark(this.props.bookmarkInfo);
          }}
        >
          <div className="mouseOut">
            <div> {desc} </div>
            <div>
              {emojis.map((emoji) => {
                return <span id="emoji"> {emoji} </span>;
              })}
              <div id="created_at"> {created_at} </div>
            </div>
          </div>
        </div>
        <div className="bookmarkDeleteBtn">
          <button
            onClick={() => {
              this.props.deleteBookmark(this.props.bookmarkInfo.id);
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default BookmarkEditMode;
