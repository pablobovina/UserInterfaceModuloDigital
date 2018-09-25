import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';

class ActionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState, onDelete: false, editClick: false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState, onDelete: false, editClick: false});
  }

  setMessage= (msg)=>{
    this.setState({messagePanel: msg});
  }

  onView = () =>{
    const idExp  = this.props.selectedItem;
    if(!idExp){
      this.props.setMessage("por favor seleccione un elemento de la lista");
      console.log("idExp no seleccionado");
      return;
    }
    this.setState({onView: true});
  }

  onStopExec =() =>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.props.selectedItem;

    if(!idExp){
      this.props.setMessage("por favor seleccione un elemento de la lista");
      console.log("idExp no seleccionado");
      return;
    }

    var url  = ['/','user/',username,'/experiments/',idExp,"/stop"].join("");
    var axios = require("axios");
    axios({method: "GET",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session},
            data:{}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({onStopExec: true});
    })
    .catch((err)=>{
      this.props.setMessage(err.response.data.error);
      console.log(err.response.data.error);
    });
  }

  onReport= () =>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.props.selectedItem;

    if(!idExp){
      this.props.setMessage("por favor seleccione un elemento de la lista");
      console.log("idExp no seleccionado");
      return;
    }

    var url  = ['/','user/',username,'/experiments/',idExp,"/zip"].join("");
    var axios = require("axios");
    axios({method: "GET",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session},
            data:{},
            responseType: 'blob', // important
        })
    .then((response)=>{
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte.zip');
      document.body.appendChild(link);
      link.click();
    })
    .catch((err)=>{
      this.props.setMessage(err.response.data.error);
      console.log(err.response.data.error);
    });

  }

  render (){
    if(this.props.selectedItem && this.state.onView){
      var url  = ["ver_resultado/",this.props.selectedItem].join("");
      return (<Redirect to={url}/>);
    }


    const res =
    <nav className="navbar navbar-expand-lg navbar-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Edicion
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
               <a className="dropdown-item" onClick={this.onView}>Ver</a>
            </div>
          </li>
          <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Ejecucion
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             <a className="dropdown-item" onClick={this.onStopExec}>Cancelar ejecucion</a>
           </div>
          </li>
          <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Analisis
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             <a className="dropdown-item" onClick={this.onReport}>Reporte</a>
           </div>
          </li>
        </ul>
      </div>
      </nav>;

    return res;
  }
}

export default ActionPanel
