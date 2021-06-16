import axios from 'axios';
import React from 'react';
import Footer from '../components/Footer';
import BackBtn from '../components/BackBtn';
import SignOutBtn from '../components/SignOutBtn';
import ProfileBtn from '../components/ProfileBtn';
import Alarm from '../components/Alarm';
import BookmarkReadMode from '../components/BookmarkReadMode';
import CollectionEditor from '../components/CollectionEditor';
const { setRandomColor } = require('../util/randomColor');

class Recollect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      bookmarks: [
        {
          id: 1,
          desc: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
          emojis: ['☕️', '🔥'],
          url: 'https://www.google.com/',
          created_at: '2021 - 06 - 08',
        },
        {
          id: 2,
          desc: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
          emojis: ['☕️', '🔥'],
          url: 'https://www.google.com/',
          created_at: '2021 - 06 - 08',
        },        {
          id: 3,
          desc: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
          emojis: ['☕️', '🔥'],
          url: 'https://www.google.com/',
          created_at: '2021 - 06 - 08',
        },        {
          id: 4,
          desc: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
          emojis: ['☕️', '🔥'],
          url: 'https://www.google.com/',
          created_at: '2021 - 06 - 08',
        },        {
          id: 5,
          desc: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World',
          emojis: ['☕️', '🔥'],
          url: 'https://www.google.com/',
          created_at: '2021 - 06 - 08',
        },
      ],
    }

  }



  // componentDidMount(){
  //   this.getRecollectInfo();
  // }

  render(){
    console.log(this.props.history.location);
    return(
      <div className="recollect-container">
        
        <div className="nav upper">
          <SignOutBtn handleLogOut={this.props.handleLogOut} />
          <ProfileBtn history={this.props.history} />
        </div>
        <div id="recollect-backbtn-container">
          <BackBtn history={this.props.history}/>
        </div>
        <div className="logo-container">
          <img src="logo.png" alt="logo" />
        </div>
        <Alarm 
          history={this.props.history}
          location={this.props.history.location.pathname}
        />
        <div className="nav lower"></div>
        <div className="bookmarkContainer">
        {this.state.bookmarks.map((bookmark) => (
                <BookmarkReadMode
                  key={bookmark.id}
                  getRefreshToken={this.props.getRefreshToken}
                  bookmarkInfo={bookmark}
                  color={setRandomColor()}
                />
              ))}
        </div>

        <Footer />
      </div>
    )
  }
}

export default Recollect;