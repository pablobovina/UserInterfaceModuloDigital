import React, { Component } from 'react';
import "./notification.css";

class NotificationArea extends Component {
  constructor(props){
    super(props);
  }

  clean = ()=>{
    this.props.setMessage("");
  }

  render() {
    var octicons = require("octicons");
    //console.log(octicons.alert.toSVG());
    console.log(this.props.message);
    var d = {__html: octicons.alert.toSVG()};
    //return <div className="bar" onClick={this.props.clean}><div dangerouslySetInnerHTML={d}/><div>{this.state.message}</div></div>;
    if(this.props.message){
        let msg = this.props.message.split (';').map ((item, i) => <text class="font-weight-light wrapp" key={i}>&#9889;{item + "\n"}</text>);
        return  <div class="alert alert-danger" role="alert" onClick={this.clean}> {msg} </div>;
    }
    return <div></div>
  }
}

export default NotificationArea;
