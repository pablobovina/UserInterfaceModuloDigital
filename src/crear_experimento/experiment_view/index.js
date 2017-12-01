import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './index.css';

class ExperimentView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  popUp = (e) =>{
    console.log("levanto el popUp");
    console.log(e.target.getAttribute('id'));
  }


  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <ul>
        {this.props.items.map(item => (
          <li key={item.id} id={item.id} onClick={this.popUp}>{item.id}--{item.type}</li>
        ))}
      </ul>;
    return res;
  }
}

export default ExperimentView;
