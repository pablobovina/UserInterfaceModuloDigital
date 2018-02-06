import React, { Component } from 'react';

class NotificationArea extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    var octicons = require("octicons");
    //console.log(octicons.alert.toSVG());
    var d = {__html: octicons.alert.toSVG()};
    return <div onClick={this.props.clean}><div dangerouslySetInnerHTML={d} /><div>{this.props.message}</div></div>;
  }
}

export default NotificationArea;