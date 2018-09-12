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
    this.setState({onView: true});
  }

  onStartExec= () =>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.props.selectedItem;
    var url  = ['/','user/',username,'/experiments/',idExp,"/run"].join("");
    var axios = require("axios");
    axios({method: "GET",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session},
            data:{}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({onStartExec: true});
    })
    .catch((err)=>{
      this.props.setMessage(err.response.data);
      //this.props.logout();
    });

  }

  onDelete= () =>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.props.selectedItem;
    var url  = ['/','user/',username,'/experiments/',idExp].join("");
    var axios = require("axios");
    axios({method: "DELETE",
            url: url,
            headers: {"X-CSRFToken": token, "sessionid":session},
            data:{}
        })
    .then((data)=>{
      var d = data.data;
      this.setState({onDelete: true});
    })
    .catch((err)=>{
      this.props.setMessage(err.response.data);
      //this.props.logout();
    });

  }

  onStopExec =() =>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.props.selectedItem;
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
      this.props.setMessage(err.response.data);
      //this.props.logout();
    });
  }

  onResult= () =>{
    const username =  this.state.mainState.username;
    const session = this.state.mainState.session;
    const token =  this.state.mainState.token;
    const idExp  = this.props.selectedItem;
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
      this.props.setMessage(err.response.data);
      //this.props.logout();
    });

  }

  render (){
    if(this.props.selectedItem && this.state.onView){
      var url  = ["ver_resultado/",this.props.selectedItem].join("");
      return (<Redirect to={url}/>);
    }

    if(this.props.selectedItem && this.state.onDelete){
      var url  = ["lista_de_experimentos/"].join("");
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
             <a className="dropdown-item" onClick={this.onStartExec}>Iniciar ejecucion</a>
             <a className="dropdown-item" onClick={this.onStopExec}>Cancelar ejecucion</a>
           </div>
          </li>
          <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Analisis
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             <a className="dropdown-item" onClick={this.onResult}>Resultados</a>
             <a className="dropdown-item" onClick={this.onDelete}>Postprocesado</a>
           </div>
          </li>
        </ul>
      </div>
      </nav>;

    return res;
  }
}

export default ActionPanel
