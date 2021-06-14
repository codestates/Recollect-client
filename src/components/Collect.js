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
    this.handleInputtextValue = this.handleInputtextValue.bind(this);
    this.handleShowEmoji = this.handleShowEmoji.bind(this);
  }

  handleInputtextValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  async handleAddBtn() {
    const { desc, url, emoji } = this.state;

    if (!desc || !url) {
      //마이페이지에 에러메시지 전달하는 메서드 필요
      return;
    }

    let emojiNumStr = emoji.reduce((acc, cur, idx) => {
      if (cur) {
        acc = acc + ', ' + (idx + 1).toString();
        return acc;
      }
    }, '');

    if (emojiNumStr === undefined) {
      await this.props.addBookmark(desc, url);
    } else {
      await this.props.addBookmark(desc, url, emojiNumStr.slice(2));
    }

    this.setState({
      desc: '',
      url: '',
      emoji: [false, false, false],
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
            onChange={this.handleInputtextValue('desc')}
          />
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
            onChange={this.handleInputtextValue('url')}
          />
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
