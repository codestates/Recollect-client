import axios from 'axios';
import React from 'react';
import Footer from '../components/Footer';
import BackBtn from '../components/BackBtn';
import SignOutBtn from '../components/SignOutBtn';
import ProfileBtn from '../components/ProfileBtn';
import Alarm from '../components/Alarm';
import BookmarkReadMode from '../components/BookmarkReadMode';

const { generateRandomColorPairArr } = require('../util/randomColor');

class Recollect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      bookmark: [],
    }
    this.getRecollectInfo = this.getRecollectInfo.bind(this);
  }

  getRecollectInfo(){
    axios
      .get('http://recollect.today/recollect', 
      {
        headers: { Authorization: `Bearer ${this.props.accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        this.setState({
          username: res.data.user.user.username, //res 확인필요
          bookmark: res.data.bookmark
        }) 
      })
      .catch((err) => {
        if(err.message === 'Not Allowed'){
          this.props.getRefreshToken();
        }
      })
  }

  componentDidMount(){
    this.getRecollectInfo();
  }

  render(){
    return(
      <div className="recollect-container">
        <div className="nav upper">
          <SignOutBtn handleLogOut={this.props.handleLogOut} />
          <ProfileBtn history={this.props.history} />
        </div>
        <div className="logo-container">
          <img src="logo.png" alt="logo" />
        </div>
        <div className="bookmarkContainer">
        {/* {this.state.bookmarks.map((bookmark) => (
                <BookmarkReadMode
                  key={bookmark.id}
                  getRefreshToken={this.getRefreshToken()}
                  bookmarkInfo={bookmark}
                  color={this.setRandomColor()}
                />
              ))} */}
        </div>


      </div>
    )
  }
}

export default Recollect;