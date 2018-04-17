import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class VistaParcial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMeasure();
  }

  getMeasure = ()=>{

    var url  = ['/',this.props.userAuthenticated,'/vista_parcial'].join("");
    var axios = require("axios");
    axios.get(url)
    .then((data)=>{
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

  componentDidMount() {
      setInterval(()=>{this.getMeasure();console.log("actualizamos grafico")}, 10000)
  }

  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <div>
                  <PanelGeneral logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated}/>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                          <ResponsiveContainer width="100%" height={700} >
                            <LineChart data={this.state.dataFromServer} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                              <XAxis/>
                              <YAxis/>
                              <CartesianGrid strokeDasharray="3 3"/>
                              <Tooltip/>
                              <Legend />
                              <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                            </LineChart>
                          </ResponsiveContainer>
                      </div>
                    </div>
                </div>
              </div>;
    return res;
  }
}

export default VistaParcial;
