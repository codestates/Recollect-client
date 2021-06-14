import React from 'react';

class Collect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: '',
      url: '',
      emoji: [false, false, false],
    };

    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.handleTrashcanBtn = this.handleTrashcanBtn.bind(this);
    this.handleEmojiBtn = this.handleEmojiBtn.bind(this);
    this.handleTextareaValue = this.handleTextareaValue.bind(this);
    this.handleShowEmoji = this.handleShowEmoji.bind(this);
  }

  handleTextareaValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleAddBtn() {
    const { desc, url, emoji } = this.state;
    let emojiNumArr = emoji.map((el, idx) => {
      if (el) {
        return idx;
      }
    });
    // 이모지 배열을
    //마이페이지에 있는 메서드를 스테이트 값들을 실어서 실행시킨다.
    // this.props.addBookmark(desc, url, emojiNumArr);
  }

  handleTrashcanBtn() {
    this.setState({
      desc: '',
      url: '',
      emoji: [false, false, false],
    });
  }

  handleEmojiBtn(idx) {
    this.setState(({ emoji }) => {
      const newEmoji = emoji;
      newEmoji[idx] = !newEmoji[idx];
      return { emoji: [...newEmoji] };
    });
  }

  handleShowEmoji() {
    const emojiArr = ['☕️', '🔥', '🚨'];
    return this.state.emoji.map((el, idx) => {
      if (el) {
        return <span key={idx}>{emojiArr[idx]}</span>;
      }
    });
  }

  render() {
    return (
      <form id="Collect-container" onSubmit={(e) => e.preventDefault()}>
        <div id="Collect-desc-container">
          <input
            type="text"
            className="Collect-textinput first"
            placeholder="Describe your collecting"
            value={this.state.desc}
            onChange={this.handleTextareaValue('desc')}
          ></input>
        </div>
        <div id="Collect-showEmoji">{this.handleShowEmoji()}</div>
        <div id="Collect-emoji-container">
          <div
            className="Collect-emojibtn"
            onClick={() => {
              this.handleEmojiBtn(0);
            }}
          >
            ☕️
          </div>
          <div
            className="Collect-emojibtn"
            onClick={() => {
              this.handleEmojiBtn(1);
            }}
          >
            🔥
          </div>
          <div
            className="Collect-emojibtn"
            onClick={() => {
              this.handleEmojiBtn(2);
            }}
          >
            🚨
          </div>
        </div>
        <div id="Collect-Linktextarea">
          <input
            type="url"
            className="Collect-textinput last"
            placeholder="Paste link... You can also drag texts or images here"
            value={this.state.url}
            onChange={this.handleTextareaValue('url')}
          ></input>
          <div id="Collect-btn-container">
            <div onClick={this.handleAddBtn} className="Collect-btn">
              ADD
            </div>
            <div onClick={this.handleTrashcanBtn} className="Collect-btn">
              <i className="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Collect;
