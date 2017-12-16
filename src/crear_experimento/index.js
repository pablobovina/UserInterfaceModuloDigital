import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import ActionPanel from "./action_panel/index.js";
import ExperimentView from "./experiment_view/index.js";
import GeneralSettings from"./general_settings/index.js";

class CrearExperimento extends Component {
  constructor(props) {
    super(props);
    this.state = {cpoints:[]};
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
        cpoints: prevState.cpoints.concat({id:Date.now(), type:"Continue"})
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
  }

  saveExperimentSettings = (metadata) => {
    console.log("actualizamos config general del experimento");
    console.log(metadata);
  }

  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <div>
                <PanelGeneral logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated} />
                <ActionPanel addCheckPoint={this.addCheckPoint} logout={this.props.logout} userAuthenticated={this.props.userAuthenticated} selectedItem={this.state.selectedItem} saveAction={this.saveExperiment}/>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-2">
                      <GeneralSettings saveAction={this.saveExperimentSettings}/>
                    </div>
                    <div class="col">
                      <h2> Experiment Plan </h2>
                      <ExperimentView items={this.state.cpoints} isAuthenticated={this.props.isAuthenticated} saveItem={this.updateCheckPoint} deleteItem={this.deleteCheckPoint}/>
                    </div>
                  </div>
                </div>
                </div>;
    return res;
  }
}

export default CrearExperimento;
