import axios from 'axios';
import React from 'react';
import Footer from '../components/Footer';
import BackBtn from '../components/BackBtn';
import BookMark from '../components/Bookmark';
import Collect from '../components/Collect';
import SignBtn from '../components/SignBtn';
import ProfileBtn from '../components/ProfileBtn';
import Alarm from '../components/Alarm';

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
    };

    this.getMypageInformation = this.getMypageInformation.bind(this);
    this.addbookmark = this.addbookmark.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
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
        headers: { Authorization: this.props.accessToken },
      })
      .then((res) => {
        const { user, bookmark } = res.data;
        this.setState({
          username: user.username,
          bookmark: bookmark,
        });
      })
      .catch((err) => {
        //console.error(err.dataValues.message);
        // this.setState({
        //   errorMessage: err.dataValues.message,
        // });
        this.getRefreshToken();
      });
  }

  addbookmark(desc, url, emoji) {
    if (!desc || !url) {
      this.setState({
        errorMessage: '설명과 url을 추가해주세요!',
      });
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
          headers: { Authorization: this.props.accessToken },
        }
      )
      .then(() => {
        this.getMypageInformation();
      })
      .catch((err) => {
        if (err.dataValues.message === 'invalid access token') {
          this.getRefreshToken();
        } else {
          this.setState({
            errorMessage: err.dataValues.message,
          });
        }
        //! 이 부분(오류메시지?)을 어떤 식으로 할지 체크하는 과정이 필요합니다!
      });
  }

  componentDidMount() {
    this.getMypageInformation();
  }

  render() {
    console.log('render');
    return (
      <div className="tempBackground">
        <div className="nav upper">
          <ProfileBtn />
          <SignBtn />
        </div>
        <div className="logo-container">
          <img src="logo.png" alt="logo"/>
        </div>
        <Collect />
        <Alarm />
        <div className="nav lower">select trashcan edit</div>
        <div className="bookmarkContainer">
          {this.state.bookmarks.map((bookmark) => (
            <BookMark key={bookmark.id} bookmarkInfo={bookmark} />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyPage;
