import React, { Component } from 'react';

class ActionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSaveClick = (e)=>{
    this.props.saveAction();
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
          <button class="btn btn-primary" onClick={this.onSaveClick}>Guardar</button>
          </li>
        </ul>
      </div>
      </nav>;

    return res;
  }
}

export default ActionPanel
