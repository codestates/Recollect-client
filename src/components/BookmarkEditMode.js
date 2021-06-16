import React from 'react';

class BookmarkEditMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    console.log('스크롤 외않되', window);
    document.querySelector('#root').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    const { desc, emojis, created_at, url } = this.props.bookmarkInfo;
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
