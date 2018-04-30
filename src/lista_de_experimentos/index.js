import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import PanelGeneral from "../panel_general/index.js";
import ActionPanel from "./action_panel/index.js";
import TablaExperimento from "./table_experiments/index.js"

class ListaExperimento extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  setSelectedItem = (item)=>{
    this.setState({selectedItem: item});
    console.log("item seleccionado");
    console.log(item);
  }


  render() {

    if(!this.props.isAuthenticated){
      return (<Redirect to="/"/>)
    }

    const res = <div>
                <PanelGeneral logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated} />
                <ActionPanel logout={this.props.logout} userAuthenticated={this.props.userAuthenticated} selectedItem={this.state.selectedItem}/>
                <div class="container-fluid">
                <TablaExperimento token = {this.props.token} s_id = {this.props.s_id} setMessage={this.props.setMessage} setSelectedItem={this.setSelectedItem} logout={this.props.logout} isAuthenticated={this.props.isAuthenticated} userAuthenticated={this.props.userAuthenticated}/>
                </div>
                </div>;
    return res;

  }
}

export default ListaExperimento;
