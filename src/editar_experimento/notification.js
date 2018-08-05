import React, { Component } from 'react';
import "./notification.css";

class NotificationArea extends Component {
  constructor(props){
    super(props);
    this.state = {"message": this.props.message};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"message": this.props.message});
  }

  render() {
    var octicons = require("octicons");
    //console.log(octicons.alert.toSVG());
    console.log(this.state.message);
    var d = {__html: octicons.alert.toSVG()};
    //return <div className="bar" onClick={this.props.clean}><div dangerouslySetInnerHTML={d}/><div>{this.state.message}</div></div>;
    if(this.state.message){
        return <div className="bar" onClick={this.props.clean}>&#9889; {this.state.message}</div>;
    }
    return <div></div>
  }
}

export default NotificationArea;
