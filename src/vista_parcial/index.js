import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';

class VistaParcial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!sessionStorage.getItem("isAuthenticated")) {
        return (<Redirect to="/"/>)
    }
    const res = <div>
                <PanelGeneral logout={this.props.logout}/>
                vista parcial de experimento {sessionStorage.getItem('userAuthenticated')}
                </div>;
    return res;
  }
}

export default VistaParcial;
