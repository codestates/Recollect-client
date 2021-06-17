import axios from "axios";
import React from "react";
import Footer from "../components/Footer";
import Collect from "../components/Collect";
import SignOutBtn from "../components/SignOutBtn";
import ProfileBtn from "../components/ProfileBtn";
import Alarm from "../components/Alarm";
import CollectionEditor from "../components/CollectionEditor";
import BookmarkReadMode from "../components/BookmarkReadMode";
import BookmarkEditMode from "../components/BookmarkEditMode";
import DefaultComp from "../components/DefaultComp";
import ScrollToTop from "../components/ScrollToTop";
import { getbookmark } from "../util/getbookmark";
const { setRandomColor } = require("../util/randomColor");

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isRecollect: false,
      unreadbookmarks: [],
      bookmark: [],
      errorMessage: "",
      isEdit: false,
      selectedInfo: {},
    };

    this.getMypageInformation = this.getMypageInformation.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.editBtnHandler = this.editBtnHandler.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.editBookmark = this.editBookmark.bind(this);
    this.sendEditedBookmark = this.sendEditedBookmark.bind(this);
  }

  editBtnHandler() {
    this.setState({
      isEdit: !this.state.isEdit,
      selectedInfo: {},
    });
  }

  editBookmark(selectedInfo) {
    const { id, descrip, url, icon } = selectedInfo;
    this.setState({
      selectedInfo: { id: id, descrip: descrip, url: url, icon: icon },
    });
  }

  deleteBookmark(bookmarkId) {
    // bookmarkID랑 토큰넣어서 보내기
    // api 확인필요합니다! collect랑 겹침
    axios
      .patch(
        "https://localhost:4000/mypage",
        {
          bookmarkId: bookmarkId,
        },
        {
          headers: { Authorization: `${this.props.accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        // 삭제성공
        this.setState({
          isEdit: false,
        });
        this.getMypageInformation();
      })
      .catch((err) => {
        // 삭제실패
        if (err.message === "Not Allowed") {
          //// err.body.message 맞는지 확인필요
          this.props.getRefreshToken();
        }
        console.error(err);
      });
  }

  getMypageInformation() {
    axios
      .get("https://localhost:4000/mypage", {
        headers: { Authorization: `${this.props.accessToken}` },
        withCredentials: true, // 여기에다가도 withCredentials true 가 들어가야함
      })
      .then((res) => {
        const { user, bookmark } = res.data.data;
        let result = getbookmark(bookmark);
        this.setState({
          username: user.username,
          bookmark: result,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorMessage: err.message,
        });
        this.props.getRefreshToken();
      });
  }

  addBookmark(desc, url, emoji) {
    if (!desc || !url) {
      this.setState({
        errorMessage: "설명과 url을 추가해주세요!",
      });
      return;
    }
    axios
      .post(
        "https://localhost:4000/mypage",
        {
          desc: desc,
          username: this.state.username,
          emoji: emoji,
          url: url,
        },
        {
          headers: { Authorization: `${this.props.accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        this.getMypageInformation();
        this.props.getRecollectInfo();
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response);
          // this.setState({
          //   errorMessage: err.response.data
          // })
        } else if (err.message) {
          console.error(err.mesasge);
        }
      });
  }

  sendEditedBookmark(desc, url, emoji) {
    if (!desc || !url) {
      this.setState({
        errorMessage: "설명과 url을 추가해주세요!",
      });
      return;
    }
    axios
      .put(
        "https://localhost:4000/mypage",
        {
          emoji: emoji,
          url: url,
          desc: desc,
          bookmarkId: this.state.selectedInfo.id,
        },
        {
          headers: { Authorization: `${this.props.accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        this.setState({
          isEdit: false,
          selectedInfo: {},
        });
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response);
          // this.setState({
          //   errorMessage: err.response.data
          // })
        } else if (err.message) {
          console.error(err.mesasge);
        }
        this.setState({
          isEdit: false,
          selectedInfo: {},
        });
      });
  }

  //**getRecollectInfo */
  getRecollectInfo() {
    axios
      .get("https://localhost:4000/recollect", {
        headers: { Authorization: `${this.props.accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        const bookmark = this.getbookmark(res.data.data.bookmark);
        console.log("리콜렉트:", res);
        this.setState({
          unreadbookmarks: bookmark,
        });
      })
      .then(() => {
        this.props.moveUnreadBookmarks(this.state.unreadbookmarks);
      })
      .catch((err) => {
        if (err.message === "Not Allowed") {
          this.props.getRefreshToken();
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.bookmark);
  }

  componentDidMount(prevProps, prevState) {
    this.getMypageInformation();
    if (prevState !== this.state) {
      this.props.getRecollectInfo();
    }
    this.props.moveUnreadBookmarks(this.state.unreadbookmarks);
  }

  render() {
    return (
      <div className="mypageBackground">
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
          selectedInfo={this.state.selectedInfo}
          sendEditedBookmark={this.sendEditedBookmark}
        />
        <Alarm
          unreadCount={
            this.props.getRecollectInfo() !== undefined
              ? this.props.getRecollectInfo().length
              : 0
          }
          getRefreshToken={this.props.getRefreshToken}
          color={this.props.setRandomColor}
          history={this.props.history}
          location={this.props.history.location.pathname}
        />
        <CollectionEditor
          editBtnHandler={this.editBtnHandler}
          isEdit={this.state.isEdit}
        />
        <div>
          <div className="bookmarkContainer">
            {this.state.bookmark.length === 0 && <DefaultComp />}
            {this.state.isEdit
              ? this.state.bookmark.map((bookmark) => (
                  <BookmarkEditMode
                    key={bookmark.id}
                    deleteBookmark={this.deleteBookmark}
                    editBookmark={this.editBookmark}
                    bookmarkInfo={bookmark}
                  />
                ))
              : this.state.bookmark.map((bookmark) => (
                  <BookmarkReadMode
                    accessToken={this.props.accessToken}
                    key={bookmark.id}
                    bookmarkInfo={bookmark}
                    color={setRandomColor()}
                    getRefreshToken={this.getRefreshToken}
                    getMypageInformation={this.getMypageInformation}
                  />
                ))}
          </div>
        </div>
        <ScrollToTop />
        <Footer />
      </div>
    );
  }
}

export default MyPage;
