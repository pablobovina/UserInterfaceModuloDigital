import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import ActionPanel from "./action_panel/index.js";
import ExperimentView from "./experiment_view/index.js";
import GeneralSettings from"./general_settings/index.js";
import ExperimentAdmin from "./experiment_admin/index.js";
import NotificationArea from "../notification_area/notification.js";

class CrearExperimento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpoints:[],
      settings:{
        a_bloq:"1",
        a_ts_unit:"ns",
        a_freq_unit:"hz",
        a_times:"0",
        a_freq:"0",
        a_lsb:"00000000",
        a_msb:"00000000",
        a_name:"",
        a_description:"",
        a_ts:"0",
        a_channel:"3",
        a_phase:"0"
      },
      mainState:this.props.mainState,
      errormessage:""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  getIndexByKeyId(a,i){
    var count = 0;
    for(let v of a){
      if(i == v.id.toString()){
        break;
      }
      count++;
    }
    return count;
  }

  addCheckPoint = (e)=>{
    this.setState((prevState) => ({
        cpoints: prevState.cpoints.concat({
          id: Date.now(),
          freq_unit: "hz",
          t_unit : "ns",
          time: "0",
          phase:"0",
          lsb:"00000000",
          msb:"00000000",
          data:"0",
          type:"C",
          freq:"0"
        })
      }));
  }

  deleteCheckPoint = (id)=>{
      this.setState((prevState) => {
          console.log(prevState.cpoints);
          var index = this.getIndexByKeyId(prevState.cpoints, id);
          prevState.cpoints.splice(index,1);
          console.log(prevState.cpoints);
          return {cpoints: prevState.cpoints};
        });
  }

  updateCheckPoint = (id, metadata) => {
    this.setState((prevState) => {
        var index = this.getIndexByKeyId(prevState.cpoints, id);
        prevState.cpoints[index] = metadata;
        prevState.cpoints[index]["id"] = id;
        return {cpoints: prevState.cpoints};
      });
  }

  saveExperiment = () => {
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;

    var url  = ['/','user/',username,'/experiments/'].join("");
    var axios = require("axios");
    axios({method: "POST",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session},
            data: {"cpoints": this.state.cpoints, "settings": this.state.settings}
        })
    .then((data)=>{
      var d = data.data;
      console.log(data)
      this.setState({isSaved:true, experimentSaved:d.expId});
    })
    .catch((err)=>{
      //this.props.setMessage("hubo un problema en el servidor");
      //this.props.logout();
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      this.setState({errormessage: err.response.data});
      this.props.setMessage(err.response.data);
    });
  }

  saveSettings = (newSettings) => {
    this.setState({settings:newSettings});
  }

  render() {
    // si no esta autenticado lo deslogueamos
    const logued = this.state.mainState.logued
    if(!logued){
      return (<Redirect to="/"/>)
    }

    //si el experimento fue guardamos vamos a vista de edicion
    if(this.state.isSaved){
      var url  = ["editar_experimento/",this.state.experimentSaved].join("");
      return (<Redirect to={url}/>);
    }

    const res = <div>
                <PanelGeneral logout={this.props.logout} mainState={this.state.mainState} />
                <NotificationArea message={this.props.mainState.message} setMessage={this.props.setMessage}/>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-2">
                      <GeneralSettings setup={this.state.settings} saveAction={this.saveSettings}/>
                    </div>
                    <div class="col">
                      <h2> Experiment Plan </h2>
                      <ExperimentAdmin addButton={this.addCheckPoint}/>
                      <ExperimentView  items={this.state.cpoints} saveItem={this.updateCheckPoint} deleteItem={this.deleteCheckPoint}/>
                    </div>
                  </div>
                </div>
                <ActionPanel saveAction={this.saveExperiment}/>
                </div>;
    return res;
  }
}

export default CrearExperimento;
