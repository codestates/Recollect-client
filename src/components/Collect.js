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
    this.handleEditBtn = this.handleEditBtn.bind(this);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.handleEmojiBtn = this.handleEmojiBtn.bind(this);
    this.handleInputtextValue = this.handleInputtextValue.bind(this);
    this.handleShowEmoji = this.handleShowEmoji.bind(this);
    this.handleShowEditing = this.handleShowEditing.bind(this);
  }

  handleInputtextValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  async handleAddBtn() {
    const { desc, url, emoji } = this.state;

    const emojiNumStr = this.emojiBoleanToNumString(emoji);

    if (emojiNumStr === undefined) {
      await this.props.addBookmark(desc, url, '');
    } else {
      await this.props.addBookmark(desc, url, emojiNumStr.slice(2));
    }

    this.handleInitialize();
  }

  emojiBoleanToNumString(emoji) {
    let emojiNumStr = emoji.reduce((acc, cur, idx) => {
      if (cur) {
        acc = acc + ', ' + (idx + 1).toString();
        return acc;
      }
    }, '');
    return emojiNumStr;
  }

  handleInitialize() {
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

  handleShowEditing({ desc, emojis, url }) {
    console.log('실행');
    const emojiArr = this.emojiConverter(emojis);
    this.setState({
      desc: desc,
      url: url,
      emoji: emojiArr,
    });
  }

  async handleEditBtn() {
    const { desc, url, emoji } = this.state;
    if (!desc || !url) {
      //마이페이지에 에러메시지 전달하는 메서드 필요
      return;
    }

    const emojiNumStr = this.emojiBoleanToNumString(emoji);

    if (emojiNumStr === undefined) {
      await this.props.sendEditedBookmark(desc, url, '');
    } else {
      await this.props.sendEditedBookmark(desc, url, emojiNumStr.slice(2));
    }

    this.handleInitialize();
  }

  emojiConverter(emojis) {
    const emojisBooleanArr = [false, false, false];
    emojis.map((el) => {
      if (el === '☕️') {
        emojisBooleanArr[0] = true;
      }

      if (el === '🔥') {
        emojisBooleanArr[1] = true;
      }

      if (el === '🚨') {
        emojisBooleanArr[2] = true;
      }
    });

    return emojisBooleanArr;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isEdit === true &&
      Object.keys(this.props.selectedInfo).length !==
        Object.keys(prevProps.selectedInfo).length
    ) {
      this.handleShowEditing(this.props.selectedInfo);
    } else if (
      Object.keys(this.props.selectedInfo).length !== 0 &&
      this.props.selectedInfo.id !== prevProps.selectedInfo.id
    ) {
      this.handleShowEditing(this.props.selectedInfo);
    }
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
            {this.props.isEdit ? (
              <div onClick={this.handleEditBtn} className="Collect-btn first">
                EDIT
              </div>
            ) : (
              <div onClick={this.handleAddBtn} className="Collect-btn second">
                Add
              </div>
            )}
            <div onClick={this.handleInitialize} className="Collect-btn">
              <i className="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Collect;
