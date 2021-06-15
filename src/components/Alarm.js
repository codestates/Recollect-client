import React from 'react';

class Alarm extends React.Component{
  constructor(props){
    super(props); //getRefreshToken 
    this.state ={
      unreadCount: 0,
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.unreadCount !== prevProps.unreadCount){
      this.setState({
        unreadCount : this.props.unreadCount,
      })
    }
  }
  render(){
    return (
      <div id="alarm" >
        <div id="alarm-alert">
            <div onClick = {() => { 
                if(this.props.location === '/mypage'){
                  this.props.history.push('/recollect')
                }
              } 
            }>
            There are {this.state.unreadCount} Collects you haven't checked.  Start to Recollect !
            </div>
        </div>
  
      </div>
    );
  }


}

export default Alarm;