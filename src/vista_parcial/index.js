import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import io from 'socket.io-client'

class VistaParcial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    var chat = io.connect('http://localhost:5000');
    
    chat.on('connect', function () {
      console.log("conexion exitosa");
    });

    chat.send('message', function () {
      console.log("emitimos message");
    });

    chat.on('message', function (data) {
      console.log("server escribio en socket");
      console.log(data);
    });

    const res = <div>
                <PanelGeneral logout={this.props.logout}/>
                vista parcial de experimento {this.props.userAuthenticated}
                </div>;
    return res;
  }
}

export default VistaParcial;
