import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PanelGeneral from '../panel_general/index.js';
import ActionPanel from "./action_panel/index.js";
import ExperimentView from "./experiment_view/index.js";
import GeneralSettings from"./general_settings/index.js";
import ExperimentAdmin from "./experiment_admin/index.js";
import NotificationArea from "../notification_area/notification.js";

class VerExperimento extends Component {

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
      idExp: this.props.match.params.idExp,
      errormessage:""
    };
    this.load_data();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  load_data = ()=>{
    var username = this.state.mainState.username;
    var idExp = this.state.idExp;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;

    var url  = ['/','user/',username,'/experiments/',idExp].join("");
    var axios = require("axios");
    axios({method: "GET",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({cpoints: d.data.cpoints, settings: d.data.settings});
    })
    .catch((err)=>{
      this.props.setMessage(err.response.data.error);
      console.log(err.response.data.error);
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

  saveExperiment = (exec) => {
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.state.idExp;
    var url  = ['/','user/',username,'/experiments/',idExp].join("");
    var axios = require("axios");
    axios({method: "PATCH",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session},
            data: {"cpoints": this.state.cpoints, "settings": this.state.settings, "execute":exec}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({isSaved:true, experimentSaved:d.expId});
    })
    .catch((err)=>{
      this.props.setMessage(err.response.data.error);
      console.log(err.response.data.error);
    });

    //ejecucion
    if(exec){
      var url  = ['/','user/',username,'/executor/',idExp,"/run"].join("");
      var axios = require("axios");
      axios({method: "GET",
              url: url,
              headers: {"X-CSRFToken": token, "sessionid":session},
              data:{}
          })
      .then((data)=>{
        var d = data.data;
        this.setState({execute: exec});
      })
      .catch((err)=>{
        this.props.setMessage(err.response.data.error);
        console.log(err.response.data.error);
      });
    }

  }

  saveSettings = (newSettings) => {
    this.setState({settings:newSettings});
  }

  cleanMessage= (msg)=>{
    this.setState({errormessage: ""});
  }

  render() {
    var username = this.state.mainState.username;
    if(username == ""){
      return (<Redirect to="/"/>);
    }

    //si venimos de una accion guardar-ejecutar exitosa
    var exec = this.state.execute;
    if(exec){
      var username = this.state.mainState.username;
      var url  = ["/",username,"/vista_parcial"].join("");
      console.log("nos vamos a vista parcial de la ejecucion en curso");
      console.log(url);
      return (<Redirect to={url}/>);
    }

    const res = <div>
                <PanelGeneral logout={this.props.logout} mainState={this.state.mainState} setMessage={this.props.setMessage}/>
                <NotificationArea message={this.props.mainState.message} setMessage={this.props.setMessage}/>
                <div class="container-fluid">
                  <div class="row">
                    <div className="col-2">
                      <GeneralSettings saveAction={this.saveSettings} setupSettings={this.state.settings}/>
                    </div>
                    <div class="col">
                      <h2> Experiment Plan </h2>
                      <ExperimentView items={this.state.cpoints} saveItem={this.updateCheckPoint} deleteItem={this.deleteCheckPoint}/>
                    </div>
                  </div>
                </div>
                </div>;
    return res;
  }
}

export default VerExperimento;
