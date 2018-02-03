import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import NotificationArea from "./notification.js";

class ExperimentAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  setMessage= (msg)=>{
    this.setState({messagePanel: msg});
  }

  cleanMessage= (msg)=>{
    this.setState({messagePanel: ""});
  }

  onAddClick = (e)=>{
    this.props.addButton();
  }


  render (){
    const msg = this.state.messagePanel;
    const res =
    <nav className="navbar navbar-expand-lg navbar-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <button class="btn btn-primary" onClick={this.onAddClick}>Agregar Check Point</button>
          </li>
        </ul>
      </div>
      <NotificationArea message={this.state.messagePanel} clean={this.cleanMessage}/>
      </nav>;

    return res;
  }
}

export default ExperimentAdmin
