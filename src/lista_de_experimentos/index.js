import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import PanelGeneral from "../panel_general/index.js";
import ActionPanel from "./action_panel/index.js";
import TablaExperimento from "./table_experiments/index.js"
import NotificationArea from "../notification_area/notification.js";

class ListaExperimento extends Component {
  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  setSelectedItem = (item)=>{
    this.setState({selectedItem: item});
  }

  render() {
    
    var username = this.state.mainState.username;
    if(username == ""){
      return (<Redirect to="/"/>);
    }

    const res = <div>
                <PanelGeneral mainState={this.state.mainState} logout={this.props.logout} setMessage={this.props.setMessage}/>
                <NotificationArea message={this.props.mainState.message} setMessage={this.props.setMessage}/>
                <ActionPanel mainState={this.state.mainState} logout={this.props.logout} selectedItem={this.state.selectedItem} setMessage={this.props.setMessage}/>
                <div class="container-fluid">
                <TablaExperimento mainState={this.state.mainState} logout={this.props.logout} setSelectedItem={this.setSelectedItem} setMessage={this.props.setMessage}  />
                </div>
                </div>;
    return res;

  }
}

export default ListaExperimento;
