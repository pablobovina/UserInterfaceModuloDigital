import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import ActionPanel from "./action_panel/index.js";
import ExperimentView from "./experiment_view/index.js";
import GeneralSettings from"./general_settings/index.js";
import ExperimentAdmin from "./experiment_admin/index.js";

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
        a_ts:"0"
      }
    };
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
          var index = this.getIndexByKeyId(prevState.cpoints, id);
          prevState.cpoints.splice(index,1);
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
    console.log("gaurdamos data en el server");
    console.log(this.state);
    var url  = ['/',this.props.userAuthenticated,'/experiments'].join("");
    var axios = require("axios");
    axios.patch(url, this.state)
    .then((data)=>{
      console.log(data);
      console.log(data.data.datas);
      // var d = data.data;
      // this.setState({products: d.datas, error:d.error, msg: d.msg, authError:d.authError});

      // if(d.authError)
      // {
      //   this.props.setMessage("usuario no autenticado");
      //   this.props.logout();
      // }

      // indicamos que esta gaurdado y que continua la edicion con id especificado
      this.setState({isSaved:true, experimentSaved:"45a6s4d65as4d6as4"});

    })
    .catch((err)=>{
      console.log(err);
      // this.props.setMessage("hubo un problema en el servidor");
      // this.props.logout();
    });
  }

  saveSettings = (newSettings) => {
    this.setState({settings:newSettings});
  }

  render() {
    // si no esta autenticado lo deslogueamos
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    //si el experimento fue guardamos vamos a vista de edicion
    if(this.state.isSaved){
      var url  = ["editar_experimento/",this.state.experimentSaved].join("");
      console.log("nos vamos a edicion");
      console.log(url);
      return (<Redirect to={url}/>);
    }   

    const res = <div>
                <PanelGeneral logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated} />
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-2">
                      <GeneralSettings setup={this.state.settings} saveAction={this.saveSettings}/>
                    </div>
                    <div class="col">
                      <h2> Experiment Plan </h2>
                      <ExperimentAdmin logout={this.props.logout} userAuthenticated={this.props.userAuthenticated}  addButton={this.addCheckPoint}/> 
                      <ExperimentView items={this.state.cpoints} isAuthenticated={this.props.isAuthenticated} saveItem={this.updateCheckPoint} deleteItem={this.deleteCheckPoint}/>
                    </div>
                  </div>
                </div>
                <ActionPanel logout={this.props.logout} userAuthenticated={this.props.userAuthenticated} saveAction={this.saveExperiment}/>
                </div>;
    return res;
  }
}

export default CrearExperimento;
