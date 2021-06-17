import React from "react";

class Collect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      url: "",
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
      await this.props.addBookmark(desc, url, "");
    } else {
      await this.props.addBookmark(desc, url, emojiNumStr);
    }

    this.handleInitialize();
  }

  emojiBoleanToNumString(emoji) {
    let emojiNumStr = emoji.reduce((acc, cur, idx) => {
      if (cur) {
        acc = acc + (idx + 1).toString();
        return acc;
      } else {
        return acc;
      }
    }, "");
    return emojiNumStr;
  }

  handleInitialize() {
    this.setState({
      desc: "",
      url: "",
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
    const emojiArr = ["☕️", "🔥", "🚨"];
    return this.state.emoji.map((el, idx) => {
      if (el) {
        return <span key={idx}>{emojiArr[idx]}</span>;
      }
      return;
    });
  }

  handleShowEditing({ descrip, icon, url }) {
    const emojiArr = this.emojiConverter(icon);
    this.setState({
      desc: descrip,
      url: url,
      emoji: emojiArr,
    });
  }

  async handleEditBtn() {
    const { desc, url, emoji } = this.state;

    const emojiNumStr = this.emojiBoleanToNumString(emoji);

    if (emojiNumStr === undefined) {
      await this.props.sendEditedBookmark(desc, url, "");
    } else {
      await this.props.sendEditedBookmark(desc, url, emojiNumStr);
    }

    this.handleInitialize();
  }

  emojiConverter(emojis) {
    const e = emojis.split("");
    const emojisBooleanArr = [false, false, false];
    //emojis가 스트링타입일 경우
    for (let el of e) {
      if (el === "☕") {
        emojisBooleanArr[0] = true;
      }

      if (el === "🔥") {
        emojisBooleanArr[1] = true;
      }

      if (el === "🚨") {
        emojisBooleanArr[2] = true;
      }
    }
    return emojisBooleanArr;
  }

  componentDidUpdate(prevProps) {
    if (
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
            placeholder="Describe your Collect"
            value={this.state.desc}
            onChange={this.handleInputtextValue("desc")}
          />
        </div>
        <div id="Collect-showEmoji">
          <div>Add Emoji</div>
          {this.handleShowEmoji()}
        </div>
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
            onChange={this.handleInputtextValue("url")}
          />
          <div id="Collect-btn-container">
            {this.props.isEdit ? (
              <div onClick={this.handleEditBtn} className="Collect-btn first">
                <i className="fas fa-check"></i>
              </div>
            ) : (
              <div onClick={this.handleAddBtn} className="Collect-btn second">
                <i className="fas fa-plus"></i>
              </div>
            )}
            <div onClick={this.handleInitialize} className="Collect-btn">
              <i className="fas fa-eraser"></i>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Collect;
