import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PanelGeneral from '../panel_general/index.js';
import ActionPanel from "./action_panel/index.js";
import ExperimentView from "./experiment_view/index.js";
import GeneralSettings from"./general_settings/index.js";
import ExperimentAdmin from "./experiment_admin/index.js";

class EditarExperimento extends Component {
  constructor(props) {
    super(props);
    this.state = {cpoints:[], settings:{}};

    var url  = ['/',this.props.userAuthenticated,'/experiments/',this.props.match.params.idExp].join("");
    var axios = require("axios");
    axios.get(url)
    .then((data)=>{
      var d = data.data;
      this.setState({
        error:d.error,
        msg: d.msg,
        authError:d.authError,
        cpoints: d.data.cpoints,
        settings: d.data.settings,
      });

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

  saveExperiment = (args) => {
    console.log("gaurdamos data en el server");

    var url  = ['/',this.props.userAuthenticated,'/experiments'].join("");
    var axios = require("axios");
    axios.patch(url, this.state)
    .then((data)=>{
      // diferenciamos un guardar de un guardar-ejecutar
      if(args.execute){
        this.setState({isSaved:true, execute:true, experimentSaved:"45a6s4d65as4d6as4"});
      }else{
        this.setState({isSaved:true, execute:false, experimentSaved:"45a6s4d65as4d6as4"});
      }

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

    //si venimos de una accion guardar-ejecutar exitosa
    if(this.state.execute){
      var url  = ["/",this.props.userAuthenticated,"/vista_parcial"].join("");
      console.log("nos vamos a vista parcial de la ejecucion en curso");
      console.log(url);
      return (<Redirect to={url}/>);
    }

    const res = <div>
                <PanelGeneral logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated} />
                <div class="container-fluid">
                  <div class="row">
                    <div className="col-2">
                      <GeneralSettings
                      a_times={this.state.settings.a_times}
                      saveAction={this.saveSettings} setupSettings={this.state.settings}/>
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

export default EditarExperimento;
