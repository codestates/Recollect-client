import axios from 'axios';
import React from 'react';
import Footer from '../components/Footer';
import BackBtn from '../components/BackBtn';
import BookMark from '../components/Bookmark';
import Collect from '../components/Collect';
import SignBtn from '../components/SignBtn';
import ProfileBtn from '../components/ProfileBtn';
import Alarm from '../components/Alarm';
import CollectionEditor from '../components/CollectionEditor';
import BookmarkReadMode from '../components/BookmarkReadMode';
import BookmarkEditMode from '../components/BookmarkEditMode';

const { generateRandomColorPairArr } = require('../util/randomColor');

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isRecollect: false,
      bookmarks: [
        {
          id: 1,
          desc: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
          emojis: ['☕️', '⚡️'],
          url: 'https://www.google.com/',
          created_at: '2021 - 06 - 08',
        },
      ],
      errorMessage: '',
      isEdit: false,
      selectecdInfo: {},
    };

    this.getMypageInformation = this.getMypageInformation.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.editBtnHandler = this.editBtnHandler.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.editBookmark = this.editBookmark.bind(this);
  }

  getRefreshToken() {
    axios
      .get('http://recollect.today/getrefreshtoken')
      .then((res) => {
        this.props.loginSuccess(res.data.accessToken);
      })
      .catch((err) => {
        //로그아웃 시키기
        // islogin, isSociallogin false 로 만들어주고 socialId지워주고 세션 파괴
      });
  }

  getMypageInformation() {
    axios
      .get('http://recollect.today/mypage', {
        headers: { Authorization: `Bearer ${this.props.accessToken}` }, // 여기에다가도 withCredentials true 가 들어가야함
      })
      .then((res) => {
        const { user, bookmark } = res.data;
        this.setState({
          username: user.username,
          bookmark: bookmark,
        });
      })
      .catch((err) => {
        console.error(err.response);
        // this.setState({
        //   errorMessage: err.dataValues.message,
        // });
        this.getRefreshToken();
      });
  }

  addBookmark(desc, url, emoji) {
    if (!desc || !url) {
      this.setState({
        errorMessage: '설명과 url을 추가해주세요!',
      });
      return;
    }
    axios
      .post(
        'http://recollect.today/mypage',
        {
          desc: desc,
          username: this.state.username,
          emoji: emoji,
          url: url,
        },
        {
          headers: { Authorization: `Bearer ${this.props.accessToken}` },
        }
      )
      .then(() => {
        this.getMypageInformation();
      })
      .catch((err) => {
        console.log(err.response); //err 메시지 접근하는 방법 다시 찾아보기
        // if (err.response.data === 'invalid access token') {
        //   this.getRefreshToken();
        // } else {
        //   this.setState({
        //     errorMessage: err.response.data,
        //   });
        // }
        //! 이 부분(오류메시지?)을 어떤 식으로 할지 체크하는 과정이 필요합니다!
      });
  }

  componentDidMount() {
    this.getMypageInformation();
  }

  render() {
    console.log(generateRandomColorPairArr());
    return (
      <div className="tempBackground">
        <div className="nav upper">
          <SignOutBtn handleLogOut={this.props.handleLogOut} />
          <ProfileBtn history={this.props.history} />
        </div>
        <div className="logo-container">
          <img src="logo.png" alt="logo" />
        </div>
        <Collect
          addBookmark={this.addBookmark}
          isEdit={this.state.isEdit}
          selectecdInfo={this.state.selectecdInfo}
        />
        <Alarm />
        <CollectionEditor
          editBtnHandler={this.editBtnHandler}
          isEdit={this.state.isEdit}
        />
        {this.state.isEdit ? (
          <div>
            <div className="bookmarkContainer">
              {this.state.bookmarks.map((bookmark) => (
                <BookmarkEditMode
                  key={bookmark.id}
                  deleteBookmark={this.deleteBookmark}
                  editBookmark={this.editBookmark}
                  bookmarkInfo={bookmark}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="bookmarkContainer">
              {this.state.bookmarks.map((bookmark) => (
                <BookmarkReadMode key={bookmark.id} bookmarkInfo={bookmark} />
              ))}
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default MyPage;
