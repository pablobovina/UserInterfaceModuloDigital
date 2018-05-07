import React, { Component } from 'react';
import {Redirect, NavLink} from 'react-router-dom';
import NotificationArea from "./notification.js";
import ViewExperimento from "./view.js";

class ActionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {"mainState":this.props.mainState};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({"mainState":nextProps.mainState});
  }

  setMessage= (msg)=>{
    this.setState({messagePanel: msg});
  }

  cleanMessage= (msg)=>{
    this.setState({messagePanel: ""});
  }

  render (){
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
               <ViewExperimento logout={this.props.logout} setMessage={this.setMessage} selectedItem={this.props.selectedItem} mainState={this.state.mainState}/>
               <a className="dropdown-item" onClick={this.onEdit}>Editar</a>
               <a className="dropdown-item" onClick={this.onDelete}>Eliminar</a>
            </div>
          </li>
          <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Ejecucion
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             <a className="dropdown-item" onClick={this.onEdit}>Iniciar ejecucion</a>
             <a className="dropdown-item" onClick={this.onDelete}>Cancelar ejecucion</a>
           </div>
          </li>
          <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Analisis
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             <a className="dropdown-item" onClick={this.onEdit}>Resultados</a>
             <a className="dropdown-item" onClick={this.onDelete}>Postprocesado</a>
           </div>
          </li>
        </ul>
      </div>
      <NotificationArea message={this.state.messagePanel} clean={this.cleanMessage}/>
      </nav>;

    return res;
  }
}

export default ActionPanel
