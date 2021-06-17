import React from "react";

class BookmarkEditMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    document.querySelector("#root").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { descrip, icon, createdAt } = this.props.bookmarkInfo;
    return (
      <div className="bookmarkEditContatiner">
        <div
          className="bookmarkWidthEdit"
          onClick={
            // this.scrollToTop
            () => {
              this.scrollToTop();
              this.props.editBookmark(this.props.bookmarkInfo);
            }
          }
        >
          <div className="mouseOut" onClick={this.scrollToTop}>
            <div> {descrip} </div>
            <div>
              {icon}
              {/* {emojis.map((emoji) => {
                return <span id="emoji"> {emoji} </span>;
              })} */}
              <div id="created_at"> {createdAt} </div>
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
