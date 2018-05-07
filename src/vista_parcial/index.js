import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class VistaParcial extends Component {
  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState};
    this.getMeasure();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  getMeasure = ()=>{
    var username = this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;

    var url  = ['/','reports/'].join("");
    var axios = require("axios");
    axios({method: "GET",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({dataFromServer:d});
    })
    .catch((err)=>{
      console.log(err);
      //this.props.setMessage("hubo un problema en el servidor");
      //this.props.logout();
    });
  }

  componentDidMount() {
      setInterval(()=>{this.getMeasure();console.log("actualizamos grafico")}, 10000)
  }

  render() {

    const logued = this.state.mainState.logued;
    if(!logued){
      return (<Redirect to="/"/>)
    }

    const res = <div>
                  <PanelGeneral logout={this.props.logout} mainState={this.state.mainState}/>
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
