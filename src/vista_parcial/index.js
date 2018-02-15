import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class VistaParcial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    var url  = ['/',this.props.userAuthenticated,'/vista_parcial'].join("");
    var axios = require("axios");
    axios.get(url)
    .then((data)=>{
      console.log(data);
      console.log(data.data.datas);
      var d = data.data;
      this.setState({dataFromServer:d});

      if(d.authError)
      {
        this.props.setMessage("usuario no autenticado");
        this.props.logout();
      }


    })
    .catch((err)=>{
      console.log(err);
      this.props.setMessage("hubo un problema en el servidor");
      this.props.logout();
    });
  }

  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <div className="contenedor">
                <PanelGeneral logout={this.props.logout}/>
                vista parcial de experimento {this.props.userAuthenticated}
                <LineChart width={1366} height={600} data={this.state.dataFromServer}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis scale={'pow'} />
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Legend />
                  <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                </LineChart>
                </div>;
    return res;
  }
}

export default VistaParcial;
