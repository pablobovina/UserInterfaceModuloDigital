import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import {getFromServer} from '../../intermediate_server/data.js';

class ViewExperimento extends Component {

  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState, message:"accion no permitida", url:"#"};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  setLinkStatus = (e)=>{
    var username = this.state.mainState.username;
    var url  = ['/',username,'/experiments/', this.props.selectedItem].join("");
    getFromServer(url,'get')
    .then((datas) =>{
      this.setState({products: datas.datas, error:datas.error, msg: datas.msg, authError:datas.authError});
      if(datas.authError){
        //this.props.logout();
      }
    })
    .catch((err) => {
      this.setState({products:err.datas, error:true, msg:err.toString(), authError:true});
      //this.props.logout();
    });
  }

  render(){
    const res = <NavLink
      className = "dropdown-item  disabled"
      to={this.state.url}
      activeClassName="nav-link active"
      onClick={this.setLinkStatus}
      >Ver
    </NavLink>;
    return res;
  }
}

export default ViewExperimento;
