import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import PanelGeneral from '../panel_general/index.js';
import ActionPanel from "./action_panel/index.js";
import ExperimentView from "./experiment_view/index.js";

class CrearExperimento extends Component {
  constructor(props) {
    super(props);
    this.state = {checkpoints:[]};
  }

  addCheckPoint = (e)=>{
    console.log("agregamos CP");
    this.setState((prevState) => ({
        checkpoints: prevState.checkpoints.concat({id:Date.now(), type:"t"})
      }));
  }

  render() {
    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <div>
                <PanelGeneral logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated} />
                <ActionPanel addCheckPoint={this.addCheckPoint} logout={this.props.logout} userAuthenticated={this.props.userAuthenticated} selectedItem={this.state.selectedItem}/>
                <ExperimentView items={this.state.checkpoints} isAuthenticated={this.props.isAuthenticated}/>
                </div>;
    return res;
  }
}

export default CrearExperimento;
